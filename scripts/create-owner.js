// scripts/create-owner.js

require('dotenv').config()
const readline = require('readline')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function question(query) {
    return new Promise((resolve) => rl.question(query, resolve))
}

function questionHidden(query) {
    return new Promise((resolve) => {
        const stdin = process.stdin
        const stdout = process.stdout

        stdout.write(query)
        stdin.setRawMode(true)
        stdin.resume()
        stdin.setEncoding('utf8')

        let password = ''

        const onData = (char) => {
            char = char.toString('utf8')

            switch (char) {
                case '\n':
                case '\r':
                case '\u0004': // Ctrl+D
                    stdin.setRawMode(false)
                    stdin.pause()
                    stdin.removeListener('data', onData)
                    stdout.write('\n')
                    resolve(password)
                    break
                case '\u0003': // Ctrl+C
                    process.exit()
                    break
                case '\u007f': // Backspace
                case '\b':
                    if (password.length > 0) {
                        password = password.slice(0, -1)
                        stdout.clearLine(0)
                        stdout.cursorTo(0)
                        stdout.write(query + '*'.repeat(password.length))
                    }
                    break
                default:
                    password += char
                    stdout.write('*')
                    break
            }
        }

        stdin.on('data', onData)
    })
}

async function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

async function validatePassword(password) {
    const errors = []

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long')
    }

    if (password.length > 72) {
        errors.push('Password must be less than 72 characters')
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter')
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter')
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number')
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
        errors.push('Password must contain at least one special character')
    }

    return errors
}

async function createOwner() {
    console.log('\n=== CREATE OWNER ACCOUNT ===\n')

    try {
        // Check if owner already exists
        const existingOwner = await prisma.user.findFirst({
            where: { is_owner: true },
        })

        if (existingOwner) {
            console.log('⚠️  An owner account already exists!')
            console.log(`Email: ${existingOwner.user_email}`)
            console.log(`Name: ${existingOwner.user_name || '(not set)'}`)
            console.log(`Created: ${existingOwner.stamp_created}`)

            const confirm = await question('\nDo you want to create another owner account? (yes/no): ')
            if (confirm.toLowerCase() !== 'yes') {
                console.log('\nCancelled.')
                process.exit(0)
            }
            console.log('\n')
        }

        // Get email
        let email = ''
        let emailValid = false
        while (!emailValid) {
            email = await question('Email: ')
            emailValid = await validateEmail(email)
            if (!emailValid) {
                console.log('❌ Invalid email format. Please try again.\n')
            }
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { user_email: email },
        })

        if (existingUser) {
            console.log('❌ A user with this email already exists.')
            process.exit(1)
        }

        // Get name (optional)
        const name = await question('Name (optional): ')

        // Get password
        let password = ''
        let passwordValid = false
        while (!passwordValid) {
            password = await questionHidden('Password: ')
            const errors = await validatePassword(password)

            if (errors.length > 0) {
                console.log('❌ Password requirements not met:')
                errors.forEach((err) => console.log(`   - ${err}`))
                console.log('')
            } else {
                const confirmPassword = await questionHidden('Confirm password: ')
                if (password !== confirmPassword) {
                    console.log('❌ Passwords do not match. Please try again.\n')
                } else {
                    passwordValid = true
                }
            }
        }

        // Hash password
        console.log('\n🔐 Hashing password...')
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        console.log('📝 Creating owner account...')
        const user = await prisma.user.create({
            data: {
                user_email: email,
                user_name: name || null,
                user_password: hashedPassword,
                user_role: 'OWNER',
                is_owner: true,
            },
        })

        console.log('\n✅ Owner account created successfully!\n')
        console.log(`User ID: ${user.user_id}`)
        console.log(`Email: ${user.user_email}`)
        console.log(`Name: ${user.user_name || '(not set)'}`)
        console.log(`Role: ${user.user_role}`)
        console.log(`Created: ${user.stamp_created}`)
        console.log('\n')

    } catch (error) {
        console.error('\n❌ Error creating owner account:')
        console.error(error.message)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
        rl.close()
    }
}

createOwner()

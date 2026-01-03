// app/docs/architecture/authentication/page.tsx
import Link from 'next/link'

export default function AuthenticationPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/docs" className="text-blue-600 hover:underline text-sm">
                    ← Back to Documentation
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Authentication System</h1>
            <p className="text-xl text-gray-600 mb-12">
                JWT-based authentication with typed payloads and realm access control.
            </p>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Overview</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Autonomy uses <strong>JSON Web Tokens (JWT)</strong> for stateless authentication with the following characteristics:
                    </p>
                    <ul className="space-y-2">
                        <li><strong>HTTP-only cookies</strong> — Tokens stored securely, not accessible to JavaScript</li>
                        <li><strong>Typed payloads</strong> — TypeScript interfaces enforce token structure</li>
                        <li><strong>7-day expiration</strong> — Balance between convenience and security</li>
                        <li><strong>Server-side validation</strong> — All routes verify tokens before granting access</li>
                    </ul>
                </div>
            </section>

            {/* JWT Structure */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">JWT Token Structure</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">AuthPayload Interface</h3>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm mb-4">
                        <pre className="whitespace-pre-wrap">
{`// lib/types/auth.ts
import type { JWTPayload } from 'jose'

export interface AuthPayload extends JWTPayload {
  user_id: string  // User's unique identifier
  email: string    // User's email address
  role: string     // User's role (OWNER, SANCTUM, GUEST)
}`}
                        </pre>
                    </div>
                    <p className="text-sm text-gray-600">
                        This typed interface ensures tokens always contain the required fields and TypeScript enforces correct usage throughout the codebase.
                    </p>
                </div>
            </section>

            {/* Login Flow */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Flow</h2>
                <div className="space-y-6">
                    <div className="bg-white border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: User Submits Credentials</h3>
                        <p className="text-gray-700 mb-3">
                            User enters email and password in login form at <code className="bg-gray-100 px-2 py-1 rounded text-sm">/admin/login</code>
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// Form submits to API
fetch('/api/admin/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    user_email: email,
    user_password: password
  })
})`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white border-l-4 border-purple-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Server Validates Credentials</h3>
                        <p className="text-gray-700 mb-3">
                            API route queries database and verifies password with bcrypt
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// lib/queries/user.ts
export async function authenticateUser(data: LoginInput) {
  const { user_email, user_password } = data

  const user = await prisma.user.findUnique({
    where: { user_email }
  })

  if (!user) return null

  const isValid = await bcrypt.compare(
    user_password,
    user.user_password
  )

  return isValid ? user : null
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white border-l-4 border-green-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Generate JWT Token</h3>
                        <p className="text-gray-700 mb-3">
                            If credentials valid, create signed JWT with user data
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// app/api/admin/auth/login/route.ts
const payload: AuthPayload = {
  user_id: user.user_id,
  email: user.user_email,
  role: user.user_role,
}

const token = await new SignJWT(payload)
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('7d')
  .sign(JWT_SECRET)`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white border-l-4 border-orange-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 4: Set HTTP-Only Cookie</h3>
                        <p className="text-gray-700 mb-3">
                            Token stored in secure cookie, not accessible to client-side JavaScript
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`response.cookies.set('auth_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
})`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white border-l-4 border-red-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 5: Client Redirects</h3>
                        <p className="text-gray-700">
                            On successful login, client redirects to <code className="bg-gray-100 px-2 py-1 rounded text-sm">/admin/signals</code>
                        </p>
                    </div>
                </div>
            </section>

            {/* Auth Utilities */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Utilities</h2>
                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">getCurrentUser()</h3>
                        <p className="text-gray-700 mb-3">
                            Returns authenticated user or null. Does not throw errors.
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// lib/utils/auth.ts
export async function getCurrentUser(): Promise<AuthPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) return null

    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as AuthPayload
  } catch {
    return null
  }
}`}
                            </pre>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                            <strong>Use case:</strong> Optional auth checks, displaying user info in UI
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">requireAuth()</h3>
                        <p className="text-gray-700 mb-3">
                            Requires authentication. Redirects to login if not authenticated.
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`export async function requireAuth(): Promise<AuthPayload> {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/login')  // Server-side redirect
  }

  return user
}`}
                            </pre>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                            <strong>Use case:</strong> Server components (pages) that require authentication
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">requireAuthAPI()</h3>
                        <p className="text-gray-700 mb-3">
                            Requires authentication for API routes. Throws error if not authenticated.
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`export async function requireAuthAPI(): Promise<AuthPayload> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Not authenticated')  // Returns 401
  }

  return user
}`}
                            </pre>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                            <strong>Use case:</strong> API route handlers that return JSON errors
                        </p>
                    </div>
                </div>
            </section>

            {/* Usage Examples */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage Examples</h2>

                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Example 1: Protected Page</h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// app/admin/signals/page.tsx
import { requireAuth } from '@/lib/utils/auth'

export default async function SignalsPage() {
  const user = await requireAuth()  // Redirects if not authenticated

  const signals = await querySignals({}, user.user_id)

  return <div>...</div>
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Example 2: API Route</h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// app/api/admin/signals/route.ts
import { requireAuthAPI } from '@/lib/utils/auth'

export async function GET(request: NextRequest) {
  const user = await requireAuthAPI()  // Throws if not authenticated

  const signals = await querySignals({}, user.user_id)

  return NextResponse.json(signals)
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Example 3: Optional Auth</h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// components/SiteNavigation.tsx
const user = await getCurrentUser()  // Returns null if not authenticated

return (
  <nav>
    {user ? (
      <Link href="/admin/signals">Admin</Link>
    ) : (
      <Link href="/admin/login">Login</Link>
    )}
  </nav>
)`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logout */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Logout Flow</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Logout is handled by clearing the authentication cookie:
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                        <pre className="whitespace-pre-wrap">
{`// app/api/admin/auth/logout/route.ts
export async function POST() {
  const response = NextResponse.json({ success: true })

  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,  // Expire immediately
    path: '/',
  })

  return response
}`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Security Considerations */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Considerations</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">✅ HTTP-Only Cookies</h3>
                        <p className="text-gray-700">
                            Tokens not accessible to JavaScript, preventing XSS attacks from stealing credentials.
                        </p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">✅ Secure Flag (Production)</h3>
                        <p className="text-gray-700">
                            Cookies only sent over HTTPS in production, preventing man-in-the-middle attacks.
                        </p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">✅ SameSite Protection</h3>
                        <p className="text-gray-700">
                            SameSite=lax prevents CSRF attacks while allowing normal navigation.
                        </p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">✅ Bcrypt Password Hashing</h3>
                        <p className="text-gray-700">
                            Passwords hashed with bcrypt (cost factor 10) before storage.
                        </p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">✅ Server-Side Validation</h3>
                        <p className="text-gray-700">
                            All auth checks happen server-side. Client cannot bypass security.
                        </p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">✅ Type Safety</h3>
                        <p className="text-gray-700">
                            TypeScript enforces correct usage of auth payloads throughout codebase.
                        </p>
                    </div>
                </div>
            </section>

            {/* Environment Variables */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Environment Variables</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                    <p className="text-gray-700 mb-3">
                        Set these in your <code className="bg-gray-100 px-2 py-1 rounded text-sm">.env</code> file:
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                        <pre className="whitespace-pre-wrap">
{`JWT_SECRET="your-secure-secret-key-here"
NODE_ENV="production"  # or "development"`}
                        </pre>
                    </div>
                    <p className="text-gray-700 mt-3 text-sm">
                        <strong>Important:</strong> Use a long, random string for JWT_SECRET in production. Never commit it to version control.
                    </p>
                </div>
            </section>

            {/* Password Requirements */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Requirements</h2>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <p className="text-gray-700 mb-3">
                        Enforced during user creation (via <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm run create:owner</code>):
                    </p>
                    <ul className="space-y-2 text-gray-700">
                        <li>• Minimum 8 characters</li>
                        <li>• Maximum 72 characters (bcrypt limit)</li>
                        <li>• At least one lowercase letter</li>
                        <li>• At least one uppercase letter</li>
                        <li>• At least one number</li>
                        <li>• At least one special character</li>
                    </ul>
                </div>
            </section>

            {/* Future Enhancements */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Future Enhancements</h2>
                <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Refresh Tokens</h3>
                        <p className="text-gray-600">
                            Long-lived refresh tokens for better UX without compromising security.
                        </p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                        <p className="text-gray-600">
                            TOTP-based 2FA for enhanced account security.
                        </p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">OAuth Integration</h3>
                        <p className="text-gray-600">
                            Sign in with GitHub, Google, or other providers.
                        </p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Session Management</h3>
                        <p className="text-gray-600">
                            View and revoke active sessions from multiple devices.
                        </p>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Documentation</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/docs/getting-started" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
                        <p className="text-gray-600">Create your first owner account.</p>
                    </Link>

                    <Link href="/docs/architecture/multi-tenancy" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Tenancy</h3>
                        <p className="text-gray-600">How userId links to realm access.</p>
                    </Link>

                    <Link href="/docs/architecture/database-schema" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Database Schema</h3>
                        <p className="text-gray-600">User model and password storage.</p>
                    </Link>

                    <Link href="/docs/concepts/realms" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Realms</h3>
                        <p className="text-gray-600">What authenticated users gain access to.</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

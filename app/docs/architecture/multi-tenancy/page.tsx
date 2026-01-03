// app/docs/architecture/multi-tenancy/page.tsx
import Link from 'next/link'

export default function MultiTenancyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/docs" className="text-blue-600 hover:underline text-sm">
                    ← Back to Documentation
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Multi-Tenancy Architecture</h1>
            <p className="text-xl text-gray-600 mb-12">
                Realm-based data isolation and sovereignty enforcement.
            </p>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Architecture Overview</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Autonomy is designed from the ground up as a multi-tenant system where <strong>every piece of data belongs to a realm</strong>.
                    </p>
                    <p>
                        This isn't permission checking. This is <strong>data isolation enforced by foreign keys, database constraints, and TypeScript types</strong>.
                    </p>
                </div>
            </section>

            {/* Core Principle */}
            <section className="mb-12">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Core Principle: Sovereignty by Schema</h3>
                    <p className="text-gray-700 mb-3">
                        Traditional multi-tenant systems rely on application-layer permission checks. Autonomy enforces sovereignty at the database schema level.
                    </p>
                    <p className="text-gray-700 font-medium">
                        You can't accidentally leak data across realms because the database won't let you.
                    </p>
                </div>
            </section>

            {/* How It Works */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How Multi-Tenancy Works</h2>

                <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Every Entity Has a realm_id</h3>
                        <p className="text-gray-700 mb-3">
                            Signals, clusters, and synthesis all have a required <code className="bg-gray-100 px-2 py-1 rounded text-sm">realm_id</code> foreign key.
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`model Signal {
  signal_id   String @id
  realm_id    String // REQUIRED - can't be null
  // ... other fields

  realm       Realm  @relation(fields: [realm_id], references: [realm_id])
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Query Functions Filter by Realm</h3>
                        <p className="text-gray-700 mb-3">
                            All query functions accept a <code className="bg-gray-100 px-2 py-1 rounded text-sm">userId</code> parameter and automatically filter by realms the user has access to.
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// Get user's accessible realms
async function getUserRealmIds(userId: string): Promise<string[]> {
  const realms = await prisma.realm.findMany({
    where: {
      OR: [
        { user_id: userId },              // Realms they own
        { members: {                       // Realms they're members of
            some: { user_id: userId }
          }
        },
      ],
    },
    select: { realm_id: true },
  })
  return realms.map(r => r.realm_id)
}

// Query signals - automatically filtered
export async function querySignals(
  params: QuerySignalsParams,
  userId: string
) {
  const userRealmIds = await getUserRealmIds(userId)

  return await prisma.signal.findMany({
    where: {
      realm_id: { in: userRealmIds },  // Only accessible realms
      // ... other filters
    }
  })
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">3. TypeScript Types Enforce Realm Requirements</h3>
                        <p className="text-gray-700 mb-3">
                            Zod validation schemas require <code className="bg-gray-100 px-2 py-1 rounded text-sm">realm_id</code> on creation. You can't create an entity without specifying which realm it belongs to.
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`export const createSignalSchema = z.object({
  realm_id: z.string().length(26),  // REQUIRED
  signal_type: z.enum([...]),
  signal_title: z.string(),
  // ... other fields
})`}
                            </pre>
                        </div>
                    </div>

                    <div className="border-l-4 border-red-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Cross-Realm Operations Are Blocked</h3>
                        <p className="text-gray-700 mb-3">
                            You cannot add a signal from one realm to a cluster in another realm. The query layer enforces this.
                        </p>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// Verify signal and cluster share a realm
const signal = await prisma.signal.findUnique({
  where: { signal_id },
  select: { realm_id: true }
})

const cluster = await prisma.cluster.findUnique({
  where: { cluster_id },
  select: { realm_id: true }
})

if (signal.realm_id !== cluster.realm_id) {
  throw new Error('Cannot add signal to cluster in different realm')
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Realm Access */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Realm Access Control</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        A user has access to a realm if:
                    </p>
                    <ol className="space-y-3">
                        <li>
                            <strong>They created it</strong> — <code className="bg-gray-100 px-2 py-1 rounded text-sm">realm.user_id</code> matches their <code className="bg-gray-100 px-2 py-1 rounded text-sm">user_id</code>
                        </li>
                        <li>
                            <strong>They're a member</strong> — Entry exists in <code className="bg-gray-100 px-2 py-1 rounded text-sm">realms_users</code> table (future feature for shared realms)
                        </li>
                    </ol>
                </div>

                <div className="mt-6 bg-gray-900 text-gray-100 p-6 rounded-lg">
                    <p className="text-sm text-gray-400 mb-3">Access check implementation:</p>
                    <pre className="text-sm whitespace-pre-wrap">
{`export async function userHasRealmAccess(
  userId: string,
  realmId: string
): Promise<boolean> {
  const realm = await prisma.realm.findFirst({
    where: {
      realm_id: realmId,
      OR: [
        { user_id: userId },
        { members: { some: { user_id: userId } } }
      ]
    }
  })

  return realm !== null
}`}
                    </pre>
                </div>
            </section>

            {/* Data Flow */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Flow with Realm Isolation</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Example: Creating a Signal</h3>
                    <ol className="space-y-4 text-gray-700">
                        <li>
                            <strong>1. User submits signal creation form</strong>
                            <div className="text-sm text-gray-600 mt-1">
                                Form includes <code className="bg-gray-100 px-1 rounded">realm_id</code> (pre-selected to default realm)
                            </div>
                        </li>
                        <li>
                            <strong>2. Validation checks realm_id is present</strong>
                            <div className="text-sm text-gray-600 mt-1">
                                Zod schema requires the field
                            </div>
                        </li>
                        <li>
                            <strong>3. Backend verifies user has access to that realm</strong>
                            <div className="text-sm text-gray-600 mt-1">
                                Calls <code className="bg-gray-100 px-1 rounded">userHasRealmAccess(userId, realmId)</code>
                            </div>
                        </li>
                        <li>
                            <strong>4. Signal created with realm foreign key</strong>
                            <div className="text-sm text-gray-600 mt-1">
                                Database enforces the relationship
                            </div>
                        </li>
                        <li>
                            <strong>5. Future queries automatically filter by realm</strong>
                            <div className="text-sm text-gray-600 mt-1">
                                User can only see signals from their accessible realms
                            </div>
                        </li>
                    </ol>
                </div>
            </section>

            {/* Query Patterns */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Query Patterns</h2>

                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Pattern 1: List All Entities</h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// Get all signals user can access
const userRealmIds = await getUserRealmIds(userId)

const signals = await prisma.signal.findMany({
  where: {
    realm_id: { in: userRealmIds }
  }
})`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Pattern 2: Get Single Entity</h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// Get specific signal (verify access)
const userRealmIds = await getUserRealmIds(userId)

const signal = await prisma.signal.findFirst({
  where: {
    signal_id: signalId,
    realm_id: { in: userRealmIds }  // Access check
  }
})

if (!signal) {
  throw new Error('Signal not found or access denied')
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Pattern 3: Update Entity</h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// Only realm owner can update
const signal = await prisma.signal.findUnique({
  where: { signal_id },
  include: { realm: true }
})

if (signal.realm.user_id !== userId) {
  throw new Error('Only realm owner can update')
}

await prisma.signal.update({
  where: { signal_id },
  data: updateData
})`}
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Pattern 4: Cross-Entity Validation</h3>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                            <pre className="whitespace-pre-wrap">
{`// Ensure signal and cluster are in same realm
const [signal, cluster] = await Promise.all([
  prisma.signal.findUnique({
    where: { signal_id },
    select: { realm_id: true }
  }),
  prisma.cluster.findUnique({
    where: { cluster_id },
    select: { realm_id: true }
  })
])

if (signal.realm_id !== cluster.realm_id) {
  throw new Error('Signal and cluster must be in same realm')
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Schema-Level Isolation</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Security by Design</h3>
                        <p className="text-gray-700">
                            Data leakage is impossible at the schema level. No amount of application bugs can expose cross-realm data.
                        </p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Type Safety</h3>
                        <p className="text-gray-700">
                            TypeScript enforces realm_id requirements at compile time. Forget to pass userId? Compiler error.
                        </p>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Clear Ownership</h3>
                        <p className="text-gray-700">
                            Every entity knows which realm it belongs to. No ambiguity about data ownership.
                        </p>
                    </div>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Scalable Architecture</h3>
                        <p className="text-gray-700">
                            One user or thousands — the isolation model is identical. Future sharding is straightforward.
                        </p>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Auditability</h3>
                        <p className="text-gray-700">
                            Every query is scoped to specific realms. Easy to audit who accessed what data.
                        </p>
                    </div>

                    <div className="bg-teal-50 border-l-4 border-teal-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Future-Proof</h3>
                        <p className="text-gray-700">
                            Built for shared realms from day one. Adding multi-user collaboration doesn't require schema changes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Shared Realms */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Future: Shared Realms</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        The schema already supports shared realms through the <code className="bg-gray-100 px-2 py-1 rounded text-sm">realms_users</code> table.
                    </p>
                    <p>
                        When implemented, shared realms will enable:
                    </p>
                    <ul className="space-y-2">
                        <li><strong>Multi-user collaboration</strong> — Multiple people contributing signals to the same realm</li>
                        <li><strong>Role-based permissions</strong> — OWNER, CONTRIBUTOR, OBSERVER roles</li>
                        <li><strong>Consent-based synthesis</strong> — AI analysis across member signals with explicit permission</li>
                        <li><strong>The ansible network</strong> — Remnant instances communicating across shared realms</li>
                    </ul>
                    <p className="mt-6 font-medium">
                        The architecture is ready. The feature just needs UI and workflow implementation.
                    </p>
                </div>
            </section>

            {/* Best Practices */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
                <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Always pass userId to query functions</h3>
                        <p className="text-gray-600">
                            Never query without realm filtering. Every query function requires userId.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Verify realm access before mutations</h3>
                        <p className="text-gray-600">
                            Before update/delete, check user owns the realm or is a member.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Use transactions for cross-entity operations</h3>
                        <p className="text-gray-600">
                            When creating multiple related entities, wrap in Prisma transaction for atomicity.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Never expose realm_id in URLs</h3>
                        <p className="text-gray-600">
                            Use entity IDs in routes. realm_id is verified server-side during access checks.
                        </p>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Documentation</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/docs/architecture/database-schema" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Database Schema</h3>
                        <p className="text-gray-600">Complete schema with realm relationships.</p>
                    </Link>

                    <Link href="/docs/concepts/realms" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Understanding Realms</h3>
                        <p className="text-gray-600">High-level concept explanation.</p>
                    </Link>

                    <Link href="/docs/architecture/authentication" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication</h3>
                        <p className="text-gray-600">How userId is extracted from JWT tokens.</p>
                    </Link>

                    <Link href="/docs/philosophy" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Sovereignty Matters</h3>
                        <p className="text-gray-600">The philosophical foundation.</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

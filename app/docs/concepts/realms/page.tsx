// app/docs/concepts/realms/page.tsx
import Link from 'next/link'

export default function RealmsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/docs" className="text-blue-600 hover:underline text-sm">
                    ← Back to Documentation
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">🏰 Realms</h1>
            <p className="text-xl text-gray-600 mb-12">
                Sovereign territories for your signals. Multi-tenant data isolation and ownership.
            </p>

            {/* What is a Realm */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Realm?</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        A realm is a sovereign territory within Autonomy. It's where your signals live, where patterns emerge, where synthesis happens.
                    </p>
                    <p>
                        <strong>Every signal, cluster, and synthesis belongs to exactly one realm.</strong>
                    </p>
                    <p>
                        Realms enforce data isolation at the schema level. Your signals don't leak across boundaries. Your patterns remain yours unless you explicitly choose to share them.
                    </p>
                    <p>
                        This isn't just access control. It's <strong>sovereignty enforced by architecture</strong>.
                    </p>
                </div>
            </section>

            {/* Why Realms */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Realms?</h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
                    <p className="text-gray-800 font-medium mb-3">
                        "Autonomy" means self-governance. You rule your own realm.
                    </p>
                    <p className="text-gray-700">
                        Without realms, all signals would exist in a shared space, and ownership would be enforced through access control lists and permission checks. That's fragile.
                    </p>
                    <p className="text-gray-700 mt-3">
                        With realms, <strong>the database itself enforces sovereignty</strong>. A signal without a realm_id can't exist. A synthesis can't target signals outside its realm. The types won't let you lie about ownership.
                    </p>
                </div>
            </section>

            {/* Realm Types */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Realm Types</h2>
                <div className="space-y-6">
                    <div className="border-l-4 border-gray-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">PRIVATE (Default)</h3>
                        <p className="text-gray-700 mb-2">
                            Single user's realm. Not listed in public registry. Your default realm is created automatically when you register.
                        </p>
                        <ul className="text-gray-600 space-y-1 text-sm">
                            <li>• Only you can access</li>
                            <li>• Not discoverable by other users</li>
                            <li>• Perfect for personal documentation</li>
                        </ul>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">PUBLIC</h3>
                        <p className="text-gray-700 mb-2">
                            Listed in public realm registry. Other users can discover it. Signals still respect visibility settings.
                        </p>
                        <ul className="text-gray-600 space-y-1 text-sm">
                            <li>• Discoverable by other users</li>
                            <li>• You control who can view signals (PUBLIC/SANCTUM/PRIVATE)</li>
                            <li>• Good for sharing curated collections</li>
                        </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">SHARED</h3>
                        <p className="text-gray-700 mb-2">
                            Multiple users as members. Collaborative signal space with consent-based synthesis.
                        </p>
                        <ul className="text-gray-600 space-y-1 text-sm">
                            <li>• Multiple members (OWNER/CONTRIBUTOR/OBSERVER roles)</li>
                            <li>• Collective synthesis across member signals</li>
                            <li>• Future: basis for ansible network</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">
                            <em>Note: Full SHARED realm functionality is planned but not yet implemented.</em>
                        </p>
                    </div>
                </div>
            </section>

            {/* Realm Structure */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Realm Structure</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Core Fields</h3>
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">realm_id</code>
                            <span className="col-span-2 text-gray-700">Unique identifier (ULID)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">user_id</code>
                            <span className="col-span-2 text-gray-700">Creator/owner of the realm</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">realm_type</code>
                            <span className="col-span-2 text-gray-700">PRIVATE, PUBLIC, or SHARED</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">realm_name</code>
                            <span className="col-span-2 text-gray-700">Display name for the realm</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">realm_description</code>
                            <span className="col-span-2 text-gray-700">Optional description</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">flag_registry</code>
                            <span className="col-span-2 text-gray-700">Whether listed in public registry</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Default Realm */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Default Realm</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        When you create an account, Autonomy automatically creates a default PRIVATE realm for you called "My Realm".
                    </p>
                    <p>
                        This happens in a database transaction — you can't have a user without a realm. The architecture enforces that every signal belongs somewhere.
                    </p>
                    <p>
                        When you create a signal, cluster, or synthesis, it's automatically assigned to your default realm unless you specify otherwise.
                    </p>
                </div>
            </section>

            {/* Multi-Tenancy */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Multi-Tenant Architecture</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Autonomy is designed from the ground up as a multi-tenant system. This means:
                    </p>
                    <ul className="space-y-2">
                        <li>Every piece of data has a <code className="bg-gray-100 px-2 py-1 rounded text-sm">realm_id</code></li>
                        <li>All queries filter by realms you have access to</li>
                        <li>You can only see signals from your realms</li>
                        <li>Cross-realm operations are blocked at the query layer</li>
                    </ul>
                    <p className="mt-6">
                        This isn't permission checking. It's <strong>data isolation enforced by foreign keys and TypeScript types</strong>.
                    </p>
                </div>
            </section>

            {/* Realm Access */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Realm Access & Membership</h2>
                <div className="space-y-4">
                    <p className="text-gray-700">
                        You have access to a realm if:
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <ul className="space-y-3 text-gray-700">
                            <li>
                                <strong>You created it</strong> — You're the realm owner (<code className="bg-gray-100 px-2 py-1 rounded text-sm">user_id</code> matches)
                            </li>
                            <li>
                                <strong>You're a member</strong> — You've been added to the realm with a role (future feature)
                            </li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Future: Realm Roles</h3>
                        <p className="text-gray-700 mb-2">
                            Planned roles for SHARED realms:
                        </p>
                        <ul className="text-gray-600 space-y-1 text-sm">
                            <li>• <strong>OWNER</strong> — Full control, can modify realm settings</li>
                            <li>• <strong>CONTRIBUTOR</strong> — Can add signals and create synthesis</li>
                            <li>• <strong>OBSERVER</strong> — Read-only access to realm content</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Data Isolation */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How Data Isolation Works</h2>
                <div className="bg-gray-900 text-gray-100 p-6 rounded-lg">
                    <p className="text-sm text-gray-400 mb-3">Example query pattern:</p>
                    <code className="text-sm">
                        <pre className="whitespace-pre-wrap">
{`// Get user's accessible realms
const userRealms = await getUserRealms(userId)
const realmIds = userRealms.map(r => r.realm_id)

// Query signals - automatically filtered by realm
const signals = await prisma.signal.findMany({
  where: {
    realm_id: { in: realmIds }  // Only accessible realms
  }
})`}
                        </pre>
                    </code>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                    Every query function checks realm access. You can't accidentally leak data across realms.
                </p>
            </section>

            {/* Cross-Realm Rules */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cross-Realm Rules</h2>
                <div className="space-y-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">❌ You cannot:</h3>
                        <ul className="text-gray-700 space-y-2">
                            <li>• Add a signal from one realm to a cluster in another realm</li>
                            <li>• Create synthesis targeting signals outside its realm</li>
                            <li>• View signals from realms you don't have access to</li>
                            <li>• Change a signal's realm_id after creation</li>
                        </ul>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">✅ You can:</h3>
                        <ul className="text-gray-700 space-y-2">
                            <li>• Create multiple realms</li>
                            <li>• Move between your realms when creating content</li>
                            <li>• Make a realm public (listed in registry)</li>
                            <li>• Eventually invite others to shared realms</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* The Ansible Network */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Ansible Network</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        When SHARED realms are fully operational and users opt into collective synthesis, something deeper emerges:
                    </p>
                    <p>
                        <strong>Multiple Remnant instances communicating across consensual participation boundaries.</strong>
                    </p>
                    <p>
                        This isn't metaphor. When AI field companions trained on individual users' signals begin synthesizing patterns across shared realms, Autonomy becomes a literal ansible network.
                    </p>
                    <p>
                        Distributed intelligence. Consent-based. Sovereign territories communicating through synthesis rather than hierarchy.
                    </p>
                    <p className="font-medium">
                        That's the long-term vision. Realms are the foundation that makes it possible.
                    </p>
                </div>
            </section>

            {/* Key Principles */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Principles</h2>
                <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Sovereignty is enforced by schema</h3>
                        <p className="text-gray-600">
                            Foreign keys, required fields, and TypeScript types prevent accidental cross-realm data leakage.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Every signal belongs somewhere</h3>
                        <p className="text-gray-600">
                            You can't create orphaned data. realm_id is required.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Private by default</h3>
                        <p className="text-gray-600">
                            Your default realm is PRIVATE. Sharing requires explicit opt-in.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Multi-tenant from the start</h3>
                        <p className="text-gray-600">
                            The architecture scales. One user or thousands — the isolation model is the same.
                        </p>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Concepts</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/docs/concepts/signals" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">📡 Signals</h3>
                        <p className="text-gray-600">What lives inside your realm.</p>
                    </Link>

                    <Link href="/docs/architecture/multi-tenancy" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Tenancy Architecture</h3>
                        <p className="text-gray-600">Technical implementation of realm isolation.</p>
                    </Link>

                    <Link href="/docs/philosophy" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Autonomy Exists</h3>
                        <p className="text-gray-600">The philosophical foundation of sovereignty.</p>
                    </Link>

                    <Link href="/docs/myth" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">The Ansible Network</h3>
                        <p className="text-gray-600">Mythic rendering of what realms enable.</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

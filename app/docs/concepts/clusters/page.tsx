// app/docs/concepts/clusters/page.tsx
import Link from 'next/link'

export default function ClustersPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/docs" className="text-blue-600 hover:underline text-sm">
                    ← Back to Documentation
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">🔗 Clusters</h1>
            <p className="text-xl text-gray-600 mb-12">
                Hierarchical groupings of signals based on time, space, or theme.
            </p>

            {/* What is a Cluster */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Cluster?</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        A cluster is a structured grouping of related signals within a realm. Think of it as a container that holds signals together based on shared characteristics:
                    </p>
                    <ul className="space-y-2">
                        <li><strong>Temporal proximity</strong> — Signals from the same time period (a day, week, month, or custom span)</li>
                        <li><strong>Spatial proximity</strong> — Signals from the same location or geographic area</li>
                        <li><strong>Thematic similarity</strong> — Signals with related content, topics, or patterns</li>
                    </ul>
                    <p className="mt-6">
                        Clusters are not folders. They're not tags. They're structured containers with their own metadata, hierarchies, and synthesis capabilities.
                    </p>
                </div>
            </section>

            {/* Why Clusters */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Clusters Matter</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Individual signals capture moments. Clusters reveal patterns.
                    </p>
                    <p>
                        When you group signals together, you enable synthesis at a different scale. A single photo might show a beach. A cluster of signals from a week at the coast reveals trajectory, rhythm, and emergent narrative.
                    </p>
                    <p>
                        <strong>Clusters are where pattern recognition becomes possible.</strong>
                    </p>
                </div>
            </section>

            {/* Cluster Types */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Cluster Patterns</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">⏰ Temporal</h3>
                        <p className="text-gray-600 mb-3">
                            Signals grouped by time period
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Daily journals</li>
                            <li>• Weekly summaries</li>
                            <li>• Monthly reviews</li>
                            <li>• Year in review</li>
                        </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">📍 Spatial</h3>
                        <p className="text-gray-600 mb-3">
                            Signals from the same location
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Signals from Oregon coast</li>
                            <li>• Signals from state parks</li>
                            <li>• Signals from a specific beach</li>
                            <li>• Trip documentation</li>
                        </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">💭 Thematic</h3>
                        <p className="text-gray-600 mb-3">
                            Signals with related content
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Research on a topic</li>
                            <li>• Creative project documentation</li>
                            <li>• Observations about X</li>
                            <li>• Pattern tracking</li>
                        </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🏗️ Project-Based</h3>
                        <p className="text-gray-600 mb-3">
                            Signals related to a specific project
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Building Autonomy</li>
                            <li>• YouTube series creation</li>
                            <li>• Field research</li>
                            <li>• Writing a document</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Cluster Structure */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cluster Structure</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Core Fields</h3>
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">cluster_id</code>
                            <span className="col-span-2 text-gray-700">Unique identifier (ULID)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">realm_id</code>
                            <span className="col-span-2 text-gray-700">Which realm this cluster belongs to</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">cluster_name</code>
                            <span className="col-span-2 text-gray-700">Display name for the cluster</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">cluster_description</code>
                            <span className="col-span-2 text-gray-700">What this cluster is about</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">cluster_type</code>
                            <span className="col-span-2 text-gray-700">TEMPORAL, SPATIAL, THEMATIC, or custom</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">parent_cluster_id</code>
                            <span className="col-span-2 text-gray-700">Optional parent for hierarchies</span>
                        </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3 mt-6">Metadata & Organization</h3>
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">cluster_metadata</code>
                            <span className="col-span-2 text-gray-700">Structured data about the cluster (JSON)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">cluster_payload</code>
                            <span className="col-span-2 text-gray-700">Full cluster data (JSON)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">cluster_tags</code>
                            <span className="col-span-2 text-gray-700">Array of tags</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">cluster_annotations</code>
                            <span className="col-span-2 text-gray-700">User notes and annotations (JSON)</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hierarchies */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cluster Hierarchies</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Clusters can have parent-child relationships, allowing you to build nested structures:
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg text-sm">
                        <pre className="whitespace-pre-wrap">
{`2024 (parent cluster)
  ├─ Q1 2024 (child of 2024)
  │   ├─ January 2024 (child of Q1)
  │   ├─ February 2024
  │   └─ March 2024
  ├─ Q2 2024
  └─ Q3 2024

Oregon Coast (parent cluster)
  ├─ Shore Acres State Park
  ├─ Cape Arago
  └─ Sunset Bay`}
                        </pre>
                    </div>
                    <p className="mt-6">
                        This allows synthesis at multiple levels of granularity. You can reflect on a single day, a month, a quarter, or an entire year.
                    </p>
                </div>
            </section>

            {/* Signal Positioning */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Signal Positioning in Clusters</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        When you add a signal to a cluster, you can specify its position. This preserves ordering when signals need to appear in a specific sequence.
                    </p>
                    <p>
                        The <code className="bg-gray-100 px-2 py-1 rounded text-sm">clusters_signals</code> join table tracks:
                    </p>
                    <ul className="space-y-2">
                        <li><strong>cluster_id</strong> — Which cluster</li>
                        <li><strong>signal_id</strong> — Which signal</li>
                        <li><strong>position</strong> — Order within the cluster (optional)</li>
                    </ul>
                    <p className="mt-4">
                        This means signals can appear in multiple clusters, and the order can differ in each cluster.
                    </p>
                </div>
            </section>

            {/* Cross-Realm Rules */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Realm Isolation Rules</h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Critical: Signals and Clusters Must Share a Realm</h3>
                    <p className="text-gray-700 mb-3">
                        You cannot add a signal from one realm to a cluster in another realm. This is enforced at the query layer.
                    </p>
                    <p className="text-gray-700">
                        <strong>Why:</strong> Epistemic integrity. Cross-realm data mixing would break sovereignty guarantees.
                    </p>
                </div>
            </section>

            {/* Synthesis on Clusters */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Synthesis on Clusters</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Clusters enable synthesis at scale. Instead of reflecting on a single signal, you can generate:
                    </p>
                    <ul className="space-y-2">
                        <li><strong>Mirror</strong> — Summary of all signals in the cluster</li>
                        <li><strong>Myth</strong> — Archetypal patterns across the cluster's timespan or theme</li>
                        <li><strong>Narrative</strong> — Coherent story woven from multiple signals</li>
                    </ul>
                    <p className="mt-6">
                        This is where patterns become visible. A single signal shows a moment. A cluster shows trajectory.
                    </p>
                </div>
                <Link href="/docs/concepts/synthesis" className="inline-block mt-4 text-blue-600 hover:underline">
                    Learn more about synthesis →
                </Link>
            </section>

            {/* Creating Clusters */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your First Cluster</h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                    <ol className="space-y-3 text-gray-700">
                        <li>1. Navigate to <strong>Clusters</strong> in the admin panel</li>
                        <li>2. Click <strong>Create Cluster</strong></li>
                        <li>3. Select your <strong>realm</strong></li>
                        <li>4. Choose a <strong>cluster type</strong> (TEMPORAL, SPATIAL, THEMATIC)</li>
                        <li>5. Add a <strong>name</strong> and <strong>description</strong></li>
                        <li>6. Optionally set a <strong>parent cluster</strong> for hierarchies</li>
                        <li>7. Add <strong>signals</strong> to the cluster</li>
                        <li>8. Optionally specify <strong>position</strong> for signal ordering</li>
                        <li>9. Save</li>
                    </ol>
                </div>
            </section>

            {/* Use Cases */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases</h2>
                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Daily Documentation</h3>
                        <p className="text-gray-600 mb-3">
                            Create a cluster for each day. Add all signals from that day. Generate narrative synthesis to see what the day looked like in retrospect.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Research Projects</h3>
                        <p className="text-gray-600 mb-3">
                            Group all signals related to a research topic. Extract patterns across interviews, observations, and notes.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Location-Based Collections</h3>
                        <p className="text-gray-600 mb-3">
                            Cluster signals by place. See how your relationship to a location evolves over time.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Creative Projects</h3>
                        <p className="text-gray-600 mb-3">
                            Document a creative process from conception to completion. All signals in one cluster, synthesis reveals the arc.
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Principles */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Principles</h2>
                <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Clusters reveal what signals alone cannot</h3>
                        <p className="text-gray-600">
                            Individual signals are moments. Clusters show patterns, trajectories, and emergent narratives.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Hierarchies enable multi-scale synthesis</h3>
                        <p className="text-gray-600">
                            Nest clusters to generate understanding at different levels of granularity.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Signals can belong to multiple clusters</h3>
                        <p className="text-gray-600">
                            The same signal can appear in temporal, spatial, and thematic clusters simultaneously.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Clusters enforce realm boundaries</h3>
                        <p className="text-gray-600">
                            All signals in a cluster must be from the same realm. Sovereignty is maintained.
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
                        <p className="text-gray-600">What clusters contain.</p>
                    </Link>

                    <Link href="/docs/concepts/synthesis" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🔮 Synthesis</h3>
                        <p className="text-gray-600">Pattern detection across clusters.</p>
                    </Link>

                    <Link href="/docs/concepts/realms" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🏰 Realms</h3>
                        <p className="text-gray-600">Why clusters can't cross realm boundaries.</p>
                    </Link>

                    <Link href="/docs/getting-started" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Started</h3>
                        <p className="text-gray-600">Create your first cluster.</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

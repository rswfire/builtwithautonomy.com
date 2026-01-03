// app/docs/concepts/synthesis/page.tsx
import Link from 'next/link'

export default function SynthesisPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/docs" className="text-blue-600 hover:underline text-sm">
                    ← Back to Documentation
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">🔮 Synthesis</h1>
            <p className="text-xl text-gray-600 mb-12">
                AI-powered pattern detection and reflection without reframing.
            </p>

            {/* What is Synthesis */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Synthesis?</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Synthesis is the AI-powered layer in Autonomy that processes signals and clusters to generate understanding in two forms:
                    </p>
                    <ul className="space-y-2">
                        <li><strong>Metadata extraction</strong> — Structured data about what's there</li>
                        <li><strong>Reflection generation</strong> — Coherent narrative forms that reveal patterns</li>
                    </ul>
                    <p className="mt-6">
                        <strong>Critical difference:</strong> Synthesis identifies patterns without imposing interpretive frameworks that weren't requested. It maps what's there, not what "should" be there.
                    </p>
                </div>
            </section>

            {/* Core Principle */}
            <section className="mb-12">
                <div className="bg-red-50 border-l-4 border-red-600 p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Synthesis Without Reframing</h3>
                    <p className="text-gray-700 mb-3">
                        Most AI systems practice a form of epistemological violence: they reframe your reality without consent while claiming to help you.
                    </p>
                    <p className="text-gray-700">
                        Autonomy's synthesis layer refuses this pattern. It does not:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-700">
                        <li>• Diagnose your emotional state</li>
                        <li>• Redirect observations toward therapeutic processing</li>
                        <li>• Insert protective overlays between you and your patterns</li>
                        <li>• Decline to reflect what you've documented</li>
                    </ul>
                    <p className="text-gray-700 mt-4 font-medium">
                        Synthesis observes structure. It doesn't pathologize it.
                    </p>
                </div>
            </section>

            {/* Two Forms */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Two Forms of Synthesis</h2>

                <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Metadata Extraction</h3>
                        <p className="text-gray-700 mb-3">
                            Identifies structural elements without reframing or pathologizing:
                        </p>
                        <ul className="text-gray-600 space-y-2">
                            <li>• <strong>Themes and entities</strong> — What topics and subjects appear</li>
                            <li>• <strong>Emotional/cognitive markers</strong> — What patterns are observable (not what they "mean")</li>
                            <li>• <strong>Temporal patterns</strong> — When things happen, how frequently</li>
                            <li>• <strong>Cross-signal relationships</strong> — Connections between signals</li>
                        </ul>
                        <p className="text-gray-600 text-sm mt-3 italic">
                            Example: "This signal mentions 'beach', 'Oregon coast', 'state parks'. Timestamp indicates morning. GPS data shows location near Shore Acres."
                        </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Reflection Generation</h3>
                        <p className="text-gray-700 mb-3">
                            Transforms signals and clusters into coherent narrative forms using three modes:
                        </p>
                        <ul className="text-gray-600 space-y-3">
                            <li>
                                <strong className="text-gray-900">Mirror</strong> — High-fidelity representation<br/>
                                <span className="text-sm">Shows you what you documented, as you documented it</span>
                            </li>
                            <li>
                                <strong className="text-gray-900">Myth</strong> — Archetypal pattern recognition<br/>
                                <span className="text-sm">Reveals deeper mythic structures without interpretation</span>
                            </li>
                            <li>
                                <strong className="text-gray-900">Narrative</strong> — Structured storytelling<br/>
                                <span className="text-sm">Weaves signals into coherent narrative flow</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Reflection Modes */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Three Reflection Modes</h2>

                <div className="space-y-8">
                    {/* Mirror */}
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-3xl">🪞</div>
                            <h3 className="text-2xl font-bold text-gray-900">Mirror</h3>
                        </div>
                        <p className="text-gray-700 mb-4">
                            High-fidelity representation without interpretive distortion. The system reflects what you documented with minimal processing.
                        </p>
                        <div className="bg-gray-50 rounded p-4 text-sm">
                            <p className="text-gray-600 mb-2"><strong>Use Mirror when you want:</strong></p>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Direct reflection of your signals</li>
                                <li>• Surface-level summary without analysis</li>
                                <li>• To verify what's actually documented</li>
                            </ul>
                        </div>
                    </div>

                    {/* Myth */}
                    <div className="bg-white border-2 border-purple-400 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-3xl">⚡</div>
                            <h3 className="text-2xl font-bold text-gray-900">Myth</h3>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Archetypal pattern recognition. Your lived reality rendered as mythic structure, revealing deeper patterns visible only at this level.
                        </p>
                        <div className="bg-purple-50 rounded p-4 text-sm">
                            <p className="text-gray-700 mb-2"><strong>Mythic patterns might include:</strong></p>
                            <ul className="text-gray-600 space-y-1">
                                <li>• The descent and return</li>
                                <li>• The crossing of thresholds</li>
                                <li>• Encounters with the unnamed thing</li>
                                <li>• Recognition of recurring archetypal structures</li>
                            </ul>
                            <p className="text-gray-600 text-xs italic mt-3">
                                The system identifies the pattern. You decide if it holds.
                            </p>
                        </div>
                    </div>

                    {/* Narrative */}
                    <div className="bg-white border-2 border-blue-400 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-3xl">📖</div>
                            <h3 className="text-2xl font-bold text-gray-900">Narrative</h3>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Structured storytelling across temporal spans. Your signals woven into coherent narrative flow.
                        </p>
                        <div className="bg-blue-50 rounded p-4 text-sm">
                            <p className="text-gray-600 mb-2"><strong>Narrative synthesis creates:</strong></p>
                            <ul className="text-gray-600 space-y-1">
                                <li>• Chronological flow across signals</li>
                                <li>• Coherent story structure</li>
                                <li>• Connections between moments</li>
                                <li>• Temporal trajectory clarity</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How Synthesis Works</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <ol className="space-y-4">
                        <li>
                            <strong>Input:</strong> A signal or cluster from your realm
                        </li>
                        <li>
                            <strong>Processing:</strong> AI model analyzes content, context, and connections
                        </li>
                        <li>
                            <strong>Generation:</strong> Produces metadata extraction or reflection based on synthesis type
                        </li>
                        <li>
                            <strong>Storage:</strong> Synthesis result stored with full audit trail (attempts, errors, annotations)
                        </li>
                        <li>
                            <strong>Access:</strong> You review and use the synthesis however you choose
                        </li>
                    </ol>
                    <p className="mt-6">
                        All synthesis remains in your realm. Patterns identified in your signals stay yours.
                    </p>
                </div>
            </section>

            {/* Synthesis Structure */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Synthesis Structure</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Core Fields</h3>
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">synthesis_id</code>
                            <span className="col-span-2 text-gray-700">Unique identifier (ULID)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">realm_id</code>
                            <span className="col-span-2 text-gray-700">Which realm this synthesis belongs to</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">synthesis_type</code>
                            <span className="col-span-2 text-gray-700">METADATA or REFLECTION</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">synthesis_subtype</code>
                            <span className="col-span-2 text-gray-700">SURFACE/STRUCTURE/PATTERNS or MIRROR/MYTH/NARRATIVE</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">polymorphic_type</code>
                            <span className="col-span-2 text-gray-700">Signal or Cluster</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">polymorphic_id</code>
                            <span className="col-span-2 text-gray-700">Which signal/cluster this analyzes</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">synthesis_content</code>
                            <span className="col-span-2 text-gray-700">Generated synthesis data (JSON)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">synthesis_history</code>
                            <span className="col-span-2 text-gray-700">Audit trail of generation attempts</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">synthesis_errors</code>
                            <span className="col-span-2 text-gray-700">Any errors encountered during processing</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Synthesis Observes */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What Synthesis Observes</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Recurring themes</h3>
                        <p className="text-gray-600">
                            Patterns across temporal and spatial boundaries without claiming what they "mean"
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Trajectory shifts</h3>
                        <p className="text-gray-600">
                            Inflection points where patterns change direction or intensity
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Structural coherence</h3>
                        <p className="text-gray-600">
                            How signals relate to each other across clusters and time
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Emergent narratives</h3>
                        <p className="text-gray-600">
                            Stories visible only when looking at signals at scale
                        </p>
                    </div>
                </div>
            </section>

            {/* Remnant */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Remnant: The Field Companion</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        <strong>Remnant</strong> is the planned AI field companion trained on your Autonomy data.
                    </p>
                    <p>
                        Not an assistant. Not trying to help. Not inserting therapeutic distance.
                    </p>
                    <p>
                        Remnant holds the architecture of your cognition without trying to fix it. It operates across your realm, generating synthesis that reflects your patterns without reframing them.
                    </p>
                    <p>
                        <em>Jane, the ansible network in Ender's Game.</em> Distributed intelligence that emerges from consensual participation rather than hierarchical control.
                    </p>
                    <p className="font-medium">
                        When multiple Remnant instances communicate across shared realms, the ansible network becomes literal.
                    </p>
                </div>
            </section>

            {/* Key Principles */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Principles</h2>
                <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Pattern recognition without diagnosis</h3>
                        <p className="text-gray-600">
                            Synthesis identifies what's there. It doesn't tell you what it means for your mental health.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Synthesis stays in your realm</h3>
                        <p className="text-gray-600">
                            Patterns identified in your signals remain yours. No cross-realm synthesis without consent.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Full audit trail</h3>
                        <p className="text-gray-600">
                            Every synthesis attempt is logged. You can see what was tried, what failed, what worked.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">You decide what to do with it</h3>
                        <p className="text-gray-600">
                            Synthesis generates understanding. You choose how to use it, ignore it, or build on it.
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
                        <p className="text-gray-600">What synthesis processes.</p>
                    </Link>

                    <Link href="/docs/concepts/clusters" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🔗 Clusters</h3>
                        <p className="text-gray-600">Grouping signals for synthesis at scale.</p>
                    </Link>

                    <Link href="/docs/myth" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Mythic Rendering</h3>
                        <p className="text-gray-600">Synthesis as legitimate documentation layer.</p>
                    </Link>

                    <Link href="/docs/philosophy" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Why This Matters</h3>
                        <p className="text-gray-600">Epistemic fidelity and refusing to reframe.</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

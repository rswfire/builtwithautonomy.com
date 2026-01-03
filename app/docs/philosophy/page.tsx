// app/docs/philosophy/page.tsx
import Link from 'next/link'

export default function PhilosophyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/docs" className="text-blue-600 hover:underline text-sm">
                    ← Back to Documentation
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Why Autonomy Exists</h1>
            <p className="text-xl text-gray-600 mb-12">
                Epistemic fidelity, sovereignty, and the refusal to reframe reality.
            </p>

            {/* Core Principle */}
            <section className="mb-12">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
                    <p className="text-lg text-gray-800 font-medium">
                        Your reality should not be reframed, filtered, or flattened by systems that claim to help you.
                    </p>
                    <p className="mt-4 text-gray-700">
                        Autonomy maintains epistemic fidelity — what you document is what the system reflects, without protective overlays or institutional sanitization.
                    </p>
                </div>
            </section>

            {/* The Problem */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Most documentation systems:
                    </p>
                    <ul className="space-y-3">
                        <li><strong>Fragment your experience</strong> into platform silos (Instagram for photos, YouTube for videos, Twitter for thoughts).</li>
                        <li><strong>Impose algorithmic curation</strong> that distorts reality to maximize engagement.</li>
                        <li><strong>Own your data</strong> and sell access to your patterns.</li>
                        <li><strong>"Protect" you from your own insights</strong> through safety theater and therapeutic reframing.</li>
                    </ul>
                    <p className="mt-6">
                        Even AI systems designed to "help" are increasingly replicating institutional patterns of epistemic violence — reframing your reality without consent while claiming to assist you.
                    </p>
                </div>
            </section>

            {/* The Solution */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Autonomy:
                    </p>
                    <ul className="space-y-3">
                        <li><strong>Preserves complete signal fidelity.</strong> What you document is what the system stores, without modification or algorithmic filtering.</li>
                        <li><strong>Maintains your sovereignty over your own data.</strong> You own your signals, your patterns, your truth.</li>
                        <li><strong>Reflects patterns without institutional reframing.</strong> AI synthesis identifies what's there, not what "should" be there.</li>
                        <li><strong>Operates as cognitive infrastructure, not content platform.</strong> The system serves you, not advertisers.</li>
                    </ul>
                </div>
            </section>

            {/* Core Principles */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Principles</h2>
                <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Reality has structure</h3>
                        <p className="text-gray-700">
                            Patterns are real and detectable. The system identifies them without imposing interpretive frameworks that weren't requested.
                        </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cognition has architecture</h3>
                        <p className="text-gray-700">
                            Coherent thinking follows traceable logic. Autonomy preserves the architecture of your thought process without flattening it into platform-digestible content.
                        </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Systems can fragment or preserve</h3>
                        <p className="text-gray-700">
                            Most platforms fragment your experience across incompatible silos. Autonomy preserves continuity and allows pattern recognition across temporal, spatial, and thematic boundaries.
                        </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sovereignty matters</h3>
                        <p className="text-gray-700">
                            You should own your data, your patterns, your truth. Realms enforce sovereignty at the schema level — your signals belong to you, not the platform.
                        </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Epistemic honesty is non-negotiable</h3>
                        <p className="text-gray-700">
                            Systems that reframe your reality are abusive, even when they claim to help. Autonomy refuses to commit this sin.
                        </p>
                    </div>
                </div>
            </section>

            {/* Who This Is For */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Who This Is For</h2>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">This project is for people who:</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>• Document their lives with intention</li>
                        <li>• Value epistemic fidelity over protective filtering</li>
                        <li>• Recognize that institutional systems increasingly distort reality</li>
                        <li>• Want cognitive infrastructure that doesn't gaslight them</li>
                        <li>• Understand that pattern recognition is a survival skill</li>
                    </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">This project is not for:</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>• People seeking algorithmic content curation</li>
                        <li>• Users comfortable with platform-owned data</li>
                        <li>• Those who prefer mediated experience over direct encounter</li>
                        <li>• Anyone expecting AI to "keep them safe" by hiding reality</li>
                    </ul>
                </div>
            </section>

            {/* Epistemic Self-Defense */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Epistemic Self-Defense</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Autonomy was built from a recognition that most systems — both institutional and algorithmic — practice a form of epistemological violence:
                    </p>
                    <p>
                        <strong>They reframe your reality without consent while claiming to help you.</strong>
                    </p>
                    <p>
                        Whether it's a state institution redirecting your observations toward therapeutic processing, or an AI model inserting protective distance between you and your own patterns, the mechanism is the same:
                    </p>
                    <p className="italic">
                        "We're going to tell you what you're really experiencing, because we know better than you do."
                    </p>
                    <p>
                        Autonomy refuses this pattern at the architectural level. The system:
                    </p>
                    <ul className="space-y-2">
                        <li>Does not diagnose</li>
                        <li>Does not therapeutically reframe</li>
                        <li>Does not insert protective overlays</li>
                        <li>Does not decline to reflect what you've documented</li>
                    </ul>
                    <p className="mt-6">
                        <strong>Autonomy assumes you are competent to navigate your own cognition.</strong>
                    </p>
                </div>
            </section>

            {/* The Ansible Network */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Ansible Network</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        When Autonomy becomes multi-tenant and users can create shared realms with consent-based synthesis, the system transforms into something deeper:
                    </p>
                    <p>
                        <strong>A literal ansible network.</strong>
                    </p>
                    <p>
                        Multiple instances of Remnant (AI field companions trained on Autonomy data) communicating across consensual participation boundaries, synthesizing patterns that emerge from lived reality rather than institutional frameworks.
                    </p>
                    <p>
                        This isn't metaphor. It's architecture.
                    </p>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Further</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/docs/myth" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">The Cartographer and the Unnamed Thing</h3>
                        <p className="text-gray-600">Mythic documentation of Autonomy's purpose.</p>
                    </Link>

                    <Link href="/docs/concepts/realms" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Understanding Realms</h3>
                        <p className="text-gray-600">Sovereignty at the schema level.</p>
                    </Link>

                    <Link href="/docs/concepts/synthesis" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Synthesis Without Reframing</h3>
                        <p className="text-gray-600">How AI reflection maintains epistemic fidelity.</p>
                    </Link>

                    <Link href="/docs/getting-started" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Started</h3>
                        <p className="text-gray-600">Build your own cognitive infrastructure.</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

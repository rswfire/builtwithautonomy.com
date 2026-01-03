// app/docs/concepts/signals/page.tsx
import Link from 'next/link'

export default function SignalsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/docs" className="text-blue-600 hover:underline text-sm">
                    ← Back to Documentation
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">📡 Signals</h1>
            <p className="text-xl text-gray-600 mb-12">
                Atomic units of lived data. Photos, videos, audio, text, locations — timestamped and geolocated.
            </p>

            {/* What is a Signal */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Signal?</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        A signal is the atomic unit of lived data in Autonomy. It represents a single moment of documented reality:
                    </p>
                    <ul className="space-y-2">
                        <li>A photo you took</li>
                        <li>A video you recorded</li>
                        <li>An audio note you captured</li>
                        <li>A text fragment you wrote</li>
                        <li>A location you marked</li>
                    </ul>
                    <p className="mt-6">
                        Every signal is <strong>timestamped</strong> (when it was created or imported) and optionally <strong>geolocated</strong> (where it was captured).
                    </p>
                    <p>
                        Signals are not content. They're not posts. They're documented moments of your lived reality, preserved with full structural fidelity.
                    </p>
                </div>
            </section>

            {/* Signal Types */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Signal Types</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">TEXT</h3>
                        <p className="text-gray-600">
                            Written notes, journal entries, thoughts, observations. Stored as plain text or structured data.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">PHOTO</h3>
                        <p className="text-gray-600">
                            Images captured or imported. Preserved with EXIF data when available.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">VIDEO</h3>
                        <p className="text-gray-600">
                            Video recordings. Can include YouTube URLs or uploaded files.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">AUDIO</h3>
                        <p className="text-gray-600">
                            Voice notes, recordings, ambient sound captures.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">LOCATION</h3>
                        <p className="text-gray-600">
                            Geographic markers. Coordinates with optional descriptions.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">DOCUMENT</h3>
                        <p className="text-gray-600">
                            PDFs, markdown files, structured documents.
                        </p>
                    </div>
                </div>
            </section>

            {/* Signal Structure */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Signal Structure</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Core Fields</h3>
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_id</code>
                            <span className="col-span-2 text-gray-700">Unique identifier (ULID format)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">realm_id</code>
                            <span className="col-span-2 text-gray-700">Which realm this signal belongs to</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_type</code>
                            <span className="col-span-2 text-gray-700">Type of signal (TEXT, PHOTO, VIDEO, etc.)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_title</code>
                            <span className="col-span-2 text-gray-700">Brief title or subject</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_description</code>
                            <span className="col-span-2 text-gray-700">Longer description or content</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_author</code>
                            <span className="col-span-2 text-gray-700">Who created/captured this signal</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_visibility</code>
                            <span className="col-span-2 text-gray-700">PUBLIC, PRIVATE, SANCTUM, or SHARED</span>
                        </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3 mt-6">Temporal Data</h3>
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">stamp_created</code>
                            <span className="col-span-2 text-gray-700">When signal was created in the system</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">stamp_imported</code>
                            <span className="col-span-2 text-gray-700">When the original content was captured</span>
                        </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3 mt-6">Geospatial Data</h3>
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_location</code>
                            <span className="col-span-2 text-gray-700">PostGIS Point (PostgreSQL)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_latitude</code>
                            <span className="col-span-2 text-gray-700">Latitude (MySQL)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_longitude</code>
                            <span className="col-span-2 text-gray-700">Longitude (MySQL)</span>
                        </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3 mt-6">Metadata & Payload</h3>
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_metadata</code>
                            <span className="col-span-2 text-gray-700">Structured data (JSON)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_payload</code>
                            <span className="col-span-2 text-gray-700">Full content data (JSON)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_tags</code>
                            <span className="col-span-2 text-gray-700">Array of tags for organization</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <code className="text-blue-600">signal_embedding</code>
                            <span className="col-span-2 text-gray-700">Vector embedding for semantic search</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visibility Levels */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Visibility Levels</h2>
                <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">PUBLIC</h3>
                        <p className="text-gray-700">
                            Anyone can view this signal (if they have access to the realm).
                        </p>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">SANCTUM</h3>
                        <p className="text-gray-700">
                            Only users with SANCTUM role or higher can view.
                        </p>
                    </div>

                    <div className="border-l-4 border-red-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">PRIVATE</h3>
                        <p className="text-gray-700">
                            Only the realm owner can view this signal.
                        </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">SHARED</h3>
                        <p className="text-gray-700">
                            Reserved for future multi-user realm features.
                        </p>
                    </div>
                </div>
            </section>

            {/* Signal Lifecycle */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Signal Lifecycle</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <ol className="space-y-4">
                        <li>
                            <strong>Capture</strong> — Signal is created or imported into Autonomy
                        </li>
                        <li>
                            <strong>Storage</strong> — Stored in your realm with full metadata
                        </li>
                        <li>
                            <strong>Clustering</strong> — Can be grouped with related signals
                        </li>
                        <li>
                            <strong>Synthesis</strong> — AI analysis generates reflections (Mirror, Myth, Narrative)
                        </li>
                        <li>
                            <strong>Retrieval</strong> — Search, filter, and access based on time, location, tags, or semantic similarity
                        </li>
                    </ol>
                </div>
            </section>

            {/* Creating Signals */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your First Signal</h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                    <ol className="space-y-3 text-gray-700">
                        <li>1. Navigate to <strong>Signals</strong> in the admin panel</li>
                        <li>2. Click <strong>Create Signal</strong></li>
                        <li>3. Select your <strong>realm</strong> (defaults to your private realm)</li>
                        <li>4. Choose a <strong>signal type</strong></li>
                        <li>5. Add <strong>title</strong> and <strong>description</strong></li>
                        <li>6. Optionally add <strong>location</strong>, <strong>tags</strong>, and <strong>metadata</strong></li>
                        <li>7. Set <strong>visibility</strong> level</li>
                        <li>8. Save</li>
                    </ol>
                </div>
            </section>

            {/* Key Principles */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Principles</h2>
                <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Signals are immutable by default</h3>
                        <p className="text-gray-600">
                            Once created, the core data doesn't change. You can add metadata, tags, and synthesis, but the original signal remains preserved.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Every signal belongs to a realm</h3>
                        <p className="text-gray-600">
                            Signals don't exist in isolation. They're always part of a realm, ensuring clear ownership and access control.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Signals are not content</h3>
                        <p className="text-gray-600">
                            They're documented moments of lived reality, not posts optimized for engagement.
                        </p>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Concepts</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/docs/concepts/realms" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🏰 Realms</h3>
                        <p className="text-gray-600">Understanding signal ownership and sovereignty.</p>
                    </Link>

                    <Link href="/docs/concepts/clusters" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🔗 Clusters</h3>
                        <p className="text-gray-600">Grouping related signals together.</p>
                    </Link>

                    <Link href="/docs/concepts/synthesis" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">🔮 Synthesis</h3>
                        <p className="text-gray-600">AI-powered pattern detection across signals.</p>
                    </Link>

                    <Link href="/docs/getting-started" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Started</h3>
                        <p className="text-gray-600">Create your first signal.</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

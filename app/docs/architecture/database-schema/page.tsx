// app/docs/architecture/database-schema/page.tsx
import Link from 'next/link'

export default function DatabaseSchemaPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/docs" className="text-blue-600 hover:underline text-sm">
                    ← Back to Documentation
                </Link>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Database Schema</h1>
            <p className="text-xl text-gray-600 mb-12">
                Complete schema documentation with realms, signals, clusters, and synthesis.
            </p>

            {/* Overview */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Schema Overview</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        Autonomy's database schema is designed with three core principles:
                    </p>
                    <ul className="space-y-2">
                        <li><strong>Epistemic integrity</strong> — The schema enforces truth about data ownership and relationships</li>
                        <li><strong>Multi-tenant isolation</strong> — Every entity belongs to a realm, enforced by foreign keys</li>
                        <li><strong>Extensibility</strong> — JSON fields allow flexible metadata without schema migrations</li>
                    </ul>
                </div>
            </section>

            {/* Core Models */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Models</h2>
                <div className="grid gap-6">
                    <div className="bg-white border-2 border-blue-500 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">users</h3>
                        <p className="text-gray-700 mb-4">
                            User accounts with authentication and role-based access control.
                        </p>
                        <div className="bg-gray-50 rounded p-4 text-sm space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">user_id</code>
                                <span className="col-span-2 text-gray-700">String (ULID) - Primary key</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">user_email</code>
                                <span className="col-span-2 text-gray-700">String - Unique</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">user_password</code>
                                <span className="col-span-2 text-gray-700">String - Hashed (bcrypt)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">user_name</code>
                                <span className="col-span-2 text-gray-700">String? - Optional display name</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">user_role</code>
                                <span className="col-span-2 text-gray-700">String - OWNER, SANCTUM, GUEST</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">is_owner</code>
                                <span className="col-span-2 text-gray-700">Boolean - System owner flag</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-purple-500 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">realms</h3>
                        <p className="text-gray-700 mb-4">
                            Sovereign territories for signals. Multi-tenant data isolation.
                        </p>
                        <div className="bg-gray-50 rounded p-4 text-sm space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">realm_id</code>
                                <span className="col-span-2 text-gray-700">String (ULID) - Primary key</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">user_id</code>
                                <span className="col-span-2 text-gray-700">String - Foreign key to users</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">realm_type</code>
                                <span className="col-span-2 text-gray-700">String - PRIVATE, PUBLIC, SHARED</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">realm_name</code>
                                <span className="col-span-2 text-gray-700">String - Display name</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">realm_description</code>
                                <span className="col-span-2 text-gray-700">String? - Optional description</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">flag_registry</code>
                                <span className="col-span-2 text-gray-700">Boolean - Listed in public registry?</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-green-500 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">realms_users</h3>
                        <p className="text-gray-700 mb-4">
                            Many-to-many relationship for realm membership with roles.
                        </p>
                        <div className="bg-gray-50 rounded p-4 text-sm space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">realm_id</code>
                                <span className="col-span-2 text-gray-700">String - Foreign key to realms</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">user_id</code>
                                <span className="col-span-2 text-gray-700">String - Foreign key to users</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">user_role</code>
                                <span className="col-span-2 text-gray-700">String - OWNER, CONTRIBUTOR, OBSERVER</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3 italic">
                            Future feature for shared realm collaboration
                        </p>
                    </div>

                    <div className="bg-white border-2 border-orange-500 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">signals</h3>
                        <p className="text-gray-700 mb-4">
                            Atomic units of lived data with geospatial and embedding support.
                        </p>
                        <div className="bg-gray-50 rounded p-4 text-sm space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_id</code>
                                <span className="col-span-2 text-gray-700">String (ULID) - Primary key</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">realm_id</code>
                                <span className="col-span-2 text-gray-700">String - Foreign key to realms (REQUIRED)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_type</code>
                                <span className="col-span-2 text-gray-700">String - TEXT, PHOTO, VIDEO, AUDIO, etc.</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_title</code>
                                <span className="col-span-2 text-gray-700">String - Brief title</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_description</code>
                                <span className="col-span-2 text-gray-700">String? - Longer description</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_visibility</code>
                                <span className="col-span-2 text-gray-700">String - PUBLIC, PRIVATE, SANCTUM, SHARED</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_location</code>
                                <span className="col-span-2 text-gray-700">Point? - PostGIS point (PostgreSQL)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_latitude</code>
                                <span className="col-span-2 text-gray-700">Float? - Latitude (MySQL)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_longitude</code>
                                <span className="col-span-2 text-gray-700">Float? - Longitude (MySQL)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_metadata</code>
                                <span className="col-span-2 text-gray-700">JSON? - Structured metadata</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_payload</code>
                                <span className="col-span-2 text-gray-700">JSON? - Full content data</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_tags</code>
                                <span className="col-span-2 text-gray-700">JSON? - Array of tags</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_embedding</code>
                                <span className="col-span-2 text-gray-700">Vector? - pgvector embedding</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">stamp_created</code>
                                <span className="col-span-2 text-gray-700">DateTime - When created in system</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">stamp_imported</code>
                                <span className="col-span-2 text-gray-700">DateTime? - When originally captured</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-teal-500 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">clusters</h3>
                        <p className="text-gray-700 mb-4">
                            Hierarchical groupings of signals.
                        </p>
                        <div className="bg-gray-50 rounded p-4 text-sm space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">cluster_id</code>
                                <span className="col-span-2 text-gray-700">String (ULID) - Primary key</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">realm_id</code>
                                <span className="col-span-2 text-gray-700">String - Foreign key to realms (REQUIRED)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">parent_cluster_id</code>
                                <span className="col-span-2 text-gray-700">String? - Foreign key to clusters (self-reference)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">cluster_name</code>
                                <span className="col-span-2 text-gray-700">String - Display name</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">cluster_description</code>
                                <span className="col-span-2 text-gray-700">String? - Description</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">cluster_type</code>
                                <span className="col-span-2 text-gray-700">String - TEMPORAL, SPATIAL, THEMATIC, etc.</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">cluster_metadata</code>
                                <span className="col-span-2 text-gray-700">JSON? - Structured metadata</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">cluster_payload</code>
                                <span className="col-span-2 text-gray-700">JSON? - Full cluster data</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">cluster_tags</code>
                                <span className="col-span-2 text-gray-700">JSON? - Array of tags</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">cluster_annotations</code>
                                <span className="col-span-2 text-gray-700">JSON? - User notes</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-500 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">clusters_signals</h3>
                        <p className="text-gray-700 mb-4">
                            Many-to-many relationship between clusters and signals with positioning.
                        </p>
                        <div className="bg-gray-50 rounded p-4 text-sm space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">cluster_id</code>
                                <span className="col-span-2 text-gray-700">String - Foreign key to clusters</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">signal_id</code>
                                <span className="col-span-2 text-gray-700">String - Foreign key to signals</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">position</code>
                                <span className="col-span-2 text-gray-700">Int? - Order within cluster</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-red-500 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">synthesis</h3>
                        <p className="text-gray-700 mb-4">
                            Polymorphic AI analysis layer (attaches to signals or clusters).
                        </p>
                        <div className="bg-gray-50 rounded p-4 text-sm space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">synthesis_id</code>
                                <span className="col-span-2 text-gray-700">String (ULID) - Primary key</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">realm_id</code>
                                <span className="col-span-2 text-gray-700">String - Foreign key to realms (REQUIRED)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">polymorphic_type</code>
                                <span className="col-span-2 text-gray-700">String - "Signal" or "Cluster"</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">polymorphic_id</code>
                                <span className="col-span-2 text-gray-700">String - ID of target entity</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">synthesis_type</code>
                                <span className="col-span-2 text-gray-700">String - METADATA or REFLECTION</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">synthesis_subtype</code>
                                <span className="col-span-2 text-gray-700">String - SURFACE/STRUCTURE/PATTERNS or MIRROR/MYTH/NARRATIVE</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">synthesis_depth</code>
                                <span className="col-span-2 text-gray-700">Int - Processing depth level</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">synthesis_content</code>
                                <span className="col-span-2 text-gray-700">JSON? - Generated synthesis</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">synthesis_annotations</code>
                                <span className="col-span-2 text-gray-700">JSON? - User notes</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">synthesis_history</code>
                                <span className="col-span-2 text-gray-700">JSON? - Audit trail</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">synthesis_errors</code>
                                <span className="col-span-2 text-gray-700">JSON? - Processing errors</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <code className="text-blue-600">synthesis_source</code>
                                <span className="col-span-2 text-gray-700">String? - AI model used</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Relationships */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Relationships</h2>
                <div className="bg-gray-900 text-gray-100 p-6 rounded-lg">
                    <pre className="text-sm whitespace-pre-wrap">
{`users
  └─ realms (one-to-many)
       └─ signals (one-to-many)
       └─ clusters (one-to-many)
            └─ clusters_signals (many-to-many with signals)
       └─ synthesis (one-to-many)
            └─ polymorphic to signals OR clusters

realms
  └─ realms_users (many-to-many with users)

clusters
  └─ parent_cluster (self-referencing for hierarchies)`}
                    </pre>
                </div>
            </section>

            {/* Foreign Key Constraints */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Foreign Key Constraints</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        All foreign keys cascade on delete, ensuring data integrity:
                    </p>
                    <ul className="space-y-2">
                        <li><strong>Deleting a realm</strong> → Deletes all signals, clusters, and synthesis in that realm</li>
                        <li><strong>Deleting a cluster</strong> → Removes cluster-signal associations (signals remain)</li>
                        <li><strong>Deleting a signal</strong> → Removes cluster-signal associations</li>
                        <li><strong>Deleting a user</strong> → Deletes all their owned realms (cascade)</li>
                    </ul>
                </div>
            </section>

            {/* ULID */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">ULID Identifiers</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        All primary keys use <strong>ULID</strong> (Universally Unique Lexicographically Sortable Identifier):
                    </p>
                    <ul className="space-y-2">
                        <li>26 characters long</li>
                        <li>Timestamp-based prefix (sortable by creation time)</li>
                        <li>Unique across distributed systems</li>
                        <li>URL-safe (no special characters)</li>
                    </ul>
                    <div className="bg-gray-100 rounded p-4 mt-4">
                        <code className="text-sm">01HQXYZ123ABC456DEF789GHI0</code>
                    </div>
                </div>
            </section>

            {/* Optional Features */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Optional Database Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">PostGIS (PostgreSQL)</h3>
                        <p className="text-gray-700 mb-2">
                            Geospatial extension for location-based queries:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Distance calculations</li>
                            <li>• Radius searches</li>
                            <li>• Spatial indexing</li>
                            <li>• Geometric operations</li>
                        </ul>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">pgvector (PostgreSQL)</h3>
                        <p className="text-gray-700 mb-2">
                            Vector similarity search for embeddings:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Semantic search across signals</li>
                            <li>• Find similar content</li>
                            <li>• Cluster by meaning</li>
                            <li>• Vector indexing</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Schema Generation */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Schema Generation</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                    <p>
                        The schema is generated from TypeScript schema definitions using a custom generator:
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                        <code className="text-sm">npm run db:generate-schema</code>
                    </div>
                    <p className="mt-4">
                        This creates <code className="bg-gray-100 px-2 py-1 rounded text-sm">schema.prisma</code> which Prisma uses to generate TypeScript types and database migrations.
                    </p>
                    <p>
                        <strong>Benefits:</strong>
                    </p>
                    <ul className="space-y-2">
                        <li>Type-safe schema definitions</li>
                        <li>Single source of truth in TypeScript</li>
                        <li>Automatic Prisma client generation</li>
                        <li>Database-agnostic (supports PostgreSQL and MySQL)</li>
                    </ul>
                </div>
            </section>

            {/* Migrations */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Migrations</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Migration Workflow</h3>
                    <ol className="text-gray-700 space-y-2 text-sm">
                        <li>1. Modify schema in <code className="bg-gray-100 px-2 py-1 rounded">lib/db/schemas/</code></li>
                        <li>2. Run <code className="bg-gray-100 px-2 py-1 rounded">npm run db:generate-schema</code></li>
                        <li>3. Review generated <code className="bg-gray-100 px-2 py-1 rounded">schema.prisma</code></li>
                        <li>4. Run <code className="bg-gray-100 px-2 py-1 rounded">npx prisma migrate dev --name description_of_change</code></li>
                        <li>5. Commit migration files to version control</li>
                    </ol>
                </div>
            </section>

            {/* Next Steps */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Documentation</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/docs/architecture/multi-tenancy" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Tenancy Implementation</h3>
                        <p className="text-gray-600">How realm isolation works at the query level.</p>
                    </Link>

                    <Link href="/docs/architecture/authentication" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication System</h3>
                        <p className="text-gray-600">JWT-based auth with typed payloads.</p>
                    </Link>

                    <Link href="/docs/concepts/realms" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Understanding Realms</h3>
                        <p className="text-gray-600">Why every entity has a realm_id.</p>
                    </Link>

                    <Link href="/docs/getting-started" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Started</h3>
                        <p className="text-gray-600">Set up the database and run migrations.</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

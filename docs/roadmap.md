# Autonomy System State - January 3, 2026

## Built With Autonomy

**Cognitive infrastructure for signal documentation, pattern recognition, and epistemic fidelity.**

Autonomy is an open-source platform for capturing, processing, and synthesizing lived experience into coherent knowledge structures. It treats life as a continuous stream of signals — photos, videos, audio, text, conversations — and uses AI-powered metadata extraction to identify patterns and preserve truth without distortion.

**Core principle:** Your reality should not be reframed, filtered, or flattened by systems that claim to help you.  
Autonomy maintains epistemic fidelity — what you document is what the system reflects, without protective overlays or institutional sanitization.

## Current State: Operational

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** Prisma ORM (PostgreSQL or MySQL)
- **Auth:** JWT with jose library
- **Forms:** React Hook Form + Zod validation
- **Styling:** Tailwind CSS
- **Icons:** Lucide React (via custom Icon wrapper)

---

## Architecture

### File Structure
```
app/
  layout.tsx                    # Root layout (html/body only)
  page.tsx                      # Public homepage
  admin/
    layout.tsx                  # Passthrough (dynamic export)
    page.tsx                    # Admin dashboard
    login/page.tsx              # Login page
    logout/page.tsx             # Logout handler
    signals/
      page.tsx                  # List view
      new/page.tsx              # Create form
      [id]/page.tsx             # Edit form
    clusters/
      page.tsx                  # List view
      new/page.tsx              # Create form
      [id]/page.tsx             # Edit form
    synthesis/
      page.tsx                  # List view
      new/page.tsx              # Create form
      [id]/page.tsx             # Edit form
    users/
      page.tsx                  # List view
      new/page.tsx              # Create form
      [id]/page.tsx             # Edit form
    realms/
      page.tsx                  # List view
      new/page.tsx              # Create form
      [id]/page.tsx             # Edit form
  api/admin/
    auth/
      check/route.ts            # GET user role
      login/route.ts            # POST authentication
      logout/route.ts           # POST logout
    signals/
      route.ts                  # GET list, POST create
      [id]/route.ts             # GET, PATCH, DELETE
    clusters/
      route.ts                  # GET list, POST create
      [id]/route.ts             # GET, PATCH, DELETE
    synthesis/
      route.ts                  # GET list, POST create
      [id]/route.ts             # GET, PATCH, DELETE
    users/
      route.ts                  # GET list, POST create
      [id]/route.ts             # GET, PATCH, DELETE
    realms/
      route.ts                  # GET list, POST create
      [id]/route.ts             # GET, PATCH, DELETE

components/
  Icon.tsx                      # Lucide icon wrapper with whitelist
  SiteNavigation.tsx            # Unified sidebar (public + admin)
  admin/
    forms/
      SignalForm.tsx            # Signal-specific form with type/context
      ClusterForm.tsx           # Cluster-specific form
      SynthesisForm.tsx         # Synthesis-specific form
      UserForm.tsx              # User-specific form
      RealmForm.tsx             # Realm-specific form
      FormSection.tsx           # Reusable section wrapper
      FormField.tsx             # Reusable field wrapper with description support
      TagInput.tsx              # Tag management component
      JsonEditor.tsx            # JSON textarea with validation

lib/
  constant/                     # Modular constants by domain
    index.ts                    # Re-exports all constants
    signal.ts                   # SIGNAL_TYPES, SIGNAL_CONTEXT, SIGNAL_STATUS, SIGNAL_VISIBILITY
    cluster.ts                  # CLUSTER_TYPES, CLUSTER_STATES
    synthesis.ts                # SYNTHESIS_TYPES, SYNTHESIS_SUBTYPES, POLYMORPHIC_TYPES
    realm.ts                    # REALM_TYPES, REALM_USER_ROLES
    user.ts                     # USER_ROLES, ROLE_PERMISSIONS
    common.ts                   # DEFAULTS, LIMITS, GEO
  type/                         # Modular types by domain
    index.ts                    # Re-exports all types
    signal.ts                   # Signal types and type-specific schemas
    cluster.ts                  # Cluster types
    synthesis.ts                # Synthesis types and content schemas
    realm.ts                    # Realm types
    user.ts                     # User types
    common.ts                   # Coordinates, GeographyPoint, isPostgres
    auth.ts                     # AuthPayload
  db.ts                         # Prisma client singleton
  queries/
    signal.ts                   # Signal CRUD (realm-scoped)
    cluster.ts                  # Cluster CRUD + hierarchy queries
    synthesis.ts                # Synthesis CRUD + polymorphic queries
    user.ts                     # User CRUD + auth
    realm.ts                    # Realm CRUD + membership
  validation/
    signal.ts                   # Zod schemas for signals + type-specific payloads
    cluster.ts                  # Zod schemas for clusters
    synthesis.ts                # Zod schemas for synthesis (discriminated union)
    user.ts                     # Zod schemas for users
    realm.ts                    # Zod schemas for realms
  utils/
    auth.ts                     # requireAuthAPI, verifyToken
    password.ts                 # hashPassword, verifyPassword (bcrypt)
    permissions.ts              # requireOwner, requireSanctum
    ulid.ts                     # ULID generation

middleware.ts                   # Auth protection for /admin routes
```

### Data Models

#### Realm
```typescript
{
  realm_id: ULID (PK)
  realm_name: string
  realm_type: ENUM (PRIVATE, PUBLIC, SHARED)
  realm_description?: string
  user_id: ULID (FK to users - owner)
  
  stamp_created: timestamp
  stamp_updated?: timestamp
  
  // Relations
  signals: Signal[]
  clusters: Cluster[]
  synthesis: Synthesis[]
  members: RealmUser[] (many-to-many)
}
```

#### Signal
```typescript
{
  signal_id: ULID (PK)
  realm_id: ULID (FK to realms)
  
  signal_type: ENUM (DOCUMENT, PHOTO, TRANSMISSION, CONVERSATION)
  signal_context?: ENUM (CAPTURE, NOTE, JOURNAL, CODE, REFERENCE, OBSERVATION, ARTIFACT)
  signal_title: string
  signal_description?: string
  signal_author: string
  signal_temperature?: decimal (-1.0 to 1.0, default 0.0)
  
  signal_status: ENUM (ACTIVE, PENDING, REJECTED, FAILED, ARCHIVED)
  signal_visibility: ENUM (PUBLIC, PRIVATE, SANCTUM, SHARED)
  
  // Location - database-specific
  signal_location?: JSON (PostGIS: GeoJSON Point)
  signal_latitude?: decimal (MySQL)
  signal_longitude?: decimal (MySQL)
  
  // JSON payloads - type-specific schemas
  signal_metadata?: JSON
  signal_payload?: JSON
  signal_tags?: JSON (array)
  signal_history?: JSON (audit trail)
  signal_annotations?: JSON (user notes, synthesis feedback)
  
  signal_embedding?: array[1536] (for vector search)
  
  stamp_created: timestamp
  stamp_updated?: timestamp
  stamp_imported?: timestamp (when original content was captured)
}
```

#### Cluster
```typescript
{
  cluster_id: ULID (PK)
  realm_id: ULID (FK to realms)
  
  cluster_type: ENUM (TEMPORAL, SPATIAL, THEMATIC, PROJECT, JOURNEY, EXPLORATION, COLLECTION)
  cluster_title: string
  cluster_depth: int (hierarchy level)
  cluster_state: ENUM (ACTIVE, ARCHIVED, DRAFT, PUBLISHED)
  
  cluster_annotations?: JSON
  cluster_metadata?: JSON
  cluster_payload?: JSON
  cluster_tags?: JSON (array)
  
  cluster_embedding?: array[1536]
  
  stamp_cluster_start?: timestamp
  stamp_cluster_end?: timestamp
  stamp_created: timestamp
  
  parent_cluster_id?: ULID (FK to clusters)
  
  // Pivot table: cluster_signals
  // - cluster_id, signal_id
  // - pivot_position (int)
  // - pivot_metadata (JSON)
}
```

#### Synthesis
```typescript
{
  synthesis_id: ULID (PK)
  realm_id: ULID (FK to realms)
  
  synthesis_type: ENUM (METADATA, REFLECTION)
  synthesis_subtype: string (type-dependent)
    // METADATA: SURFACE, STRUCTURE, PATTERNS
    // REFLECTION: MIRROR, MYTH, NARRATIVE
  synthesis_source?: string (AI model, human, etc.)
  synthesis_depth: int
  
  // Polymorphic target
  polymorphic_type: ENUM (Signal, Cluster)
  polymorphic_id: ULID
  
  synthesis_annotations?: JSON
  synthesis_content?: JSON (type+subtype specific schema)
  synthesis_history?: JSON (processing pipeline audit trail)
  synthesis_errors?: JSON (array of errors)
  
  synthesis_embedding?: array[1536]
  
  stamp_created: timestamp
  stamp_updated?: timestamp
}
```

#### User
```typescript
{
  user_id: ULID (PK)
  user_email: string (unique)
  user_name?: string
  user_password: string (bcrypt hashed)
  user_role: ENUM (OWNER, SANCTUM, GUEST)
  is_owner: boolean
  
  stamp_created: timestamp
  stamp_updated?: timestamp
}
```

---

## Key Design Patterns

### Realm Architecture
- Every signal, cluster, and synthesis belongs to a realm
- Users can be members of multiple realms (via RealmUser pivot table)
- Realm types: PRIVATE (single user), PUBLIC (discoverable), SHARED (collaborative)
- All queries are realm-scoped for data isolation

### Authentication Flow
1. User posts credentials to `/api/admin/auth/login`
2. Server validates, creates JWT with `{ user_id, email, role }`
3. JWT stored in httpOnly cookie as `auth_token`
4. Middleware protects `/admin/*` routes (except `/admin/login`)
5. Protected API routes call `requireAuthAPI()` which verifies token
6. Role-based permissions via `requireOwner()` / `requireSanctum()`

### Form Architecture
- **Model-specific forms** (SignalForm, ClusterForm, RealmForm, etc.)
- Each form handles its own validation, JSON parsing, submission
- Forms use React Hook Form + Controller for complex fields
- Type-specific UI (signal_type determines which fields show)
- Context descriptions shown inline in dropdowns
- TagInput component for tag management (Enter/Space to add)
- Temperature slider with live value display
- Database type (Postgres vs MySQL) passed as prop from server component

### Signal Type & Context System
- **Type** = medium (DOCUMENT, PHOTO, TRANSMISSION, CONVERSATION)
- **Context** = intent (CAPTURE, NOTE, JOURNAL, CODE, REFERENCE, OBSERVATION, ARTIFACT)
- Context is required, defaults to CAPTURE
- Type-specific payload schemas defined but forms use JSON editors for now

### History & Annotations
- `signal_history`: Auto-appended audit trail of all changes
- `signal_annotations`: User notes and synthesis feedback
- Displayed in edit forms (read-only history, add new annotations)
- Same pattern applies to synthesis for processing pipeline tracking

### Query Patterns
- All queries in `lib/queries/*` use Prisma
- Queries filter by user's accessible realms
- Filters use `Partial<FilterType>` to make all fields optional
- Role-based filtering in queries (e.g., non-owners see limited data)
- Polymorphic relations (synthesis → signal/cluster) handled manually

---

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..." or "mysql://..."

# Auth
JWT_SECRET="your-secret-key-here"  # Required for production
JWT_EXPIRES_IN="7d"                # Optional, defaults to 7d

# Optional
NODE_ENV="production"
```

---

## Constants Reference

### Signal Types (Medium)
```typescript
SIGNAL_TYPES = ['DOCUMENT', 'PHOTO', 'TRANSMISSION', 'CONVERSATION']
```

### Signal Context (Intent)
```typescript
SIGNAL_CONTEXT = ['CAPTURE', 'NOTE', 'JOURNAL', 'CODE', 'REFERENCE', 'OBSERVATION', 'ARTIFACT']
```

### Signal Status
```typescript
SIGNAL_STATUS = ['ACTIVE', 'PENDING', 'REJECTED', 'FAILED', 'ARCHIVED']
```

### Signal Visibility
```typescript
SIGNAL_VISIBILITY = ['PUBLIC', 'PRIVATE', 'SANCTUM', 'SHARED']
```

### Cluster Types
```typescript
CLUSTER_TYPES = ['TEMPORAL', 'SPATIAL', 'THEMATIC', 'PROJECT', 'JOURNEY', 'EXPLORATION', 'COLLECTION']
```

### Cluster States
```typescript
CLUSTER_STATES = ['ACTIVE', 'ARCHIVED', 'DRAFT', 'PUBLISHED']
```

### Synthesis Types & Subtypes
```typescript
SYNTHESIS_TYPES = ['METADATA', 'REFLECTION']

SYNTHESIS_SUBTYPES = {
  METADATA: ['SURFACE', 'STRUCTURE', 'PATTERNS'],
  REFLECTION: ['MIRROR', 'MYTH', 'NARRATIVE']
}
```

### Realm Types
```typescript
REALM_TYPES = ['PRIVATE', 'PUBLIC', 'SHARED']
```

### User Roles
```typescript
USER_ROLES = ['OWNER', 'SANCTUM', 'GUEST']
```

---

# ROADMAP STATUS - JANUARY 2026

---

## ✅ PHASE 1: CORE INFRASTRUCTURE - **COMPLETE**

- [x] Database schema with Prisma ORM
- [x] **Realm architecture (PRIVATE/PUBLIC/SHARED)**
- [x] **Multi-tenant data isolation**
- [x] **Realm membership system**
- [x] CRUD operations with auth
- [x] Role-based access control
- [x] ULID-based ID generation
- [x] Password hashing and validation
- [x] Geospatial support (Postgres PostGIS + MySQL lat/lng)
- [x] Embedding support (vector fields for semantic search)

---

## ✅ PHASE 2: API & AUTHENTICATION - **COMPLETE**

- [x] JWT/session-based authentication middleware
- [x] **Typed auth payloads (AuthPayload)**
- [x] **Login/logout with proper cookie handling**
- [x] **Middleware protection for admin routes**
- [x] REST API routes (full CRUD for all models)
- [x] Realm-scoped queries
- [x] Query parameter support (filters, pagination, sorting)

---

## 🔄 PHASE 3: FRONTEND & USER EXPERIENCE - **85% COMPLETE**

- [x] Frontend UI components (React/Next.js)
- [ ] Signal creation and editing interfaces
- [ ] Cluster management interfaces
- [ ] Synthesis creation interfaces
- [ ] **Realm CRUD interfaces**
- [x] **User management interfaces**
- [x] **Realm selector in forms**
- [x] **Settings page**
- [x] **Type/context-aware signal forms**
- [x] **Tag input component (Enter/Space to add)**
- [x] **Temperature slider with live display**
- [x] **Unified lat/lng input (converts to DB format)**
- [x] **History and annotations display in edit forms**
- [x] **Context descriptions in dropdowns**
- [ ] File upload for photos/videos/audio
- [ ] Interactive maps for geospatial signals
- [ ] Advanced search and filter interfaces
- [ ] Timeline/calendar visualizations
- [ ] Mobile-responsive design (partial)
- [ ] Progressive Web App (PWA) support

---

## 🔜 PHASE 4: AI & SYNTHESIS - **READY TO BUILD**

- [ ] Real-time synthesis generation
- [ ] Open-source AI reflection pipeline
- [ ] Embedding generation for semantic search
- [ ] Vector similarity queries
- [ ] Pattern detection across signals
- [ ] Clustering algorithms (temporal, spatial, thematic)
- [ ] Automated tagging and metadata extraction
- [ ] Type-specific payload processing (DOCUMENT, PHOTO, TRANSMISSION, CONVERSATION)
- [ ] **Remnant**: AI field companion trained on Autonomy data

---

## 🔜 PHASE 5: CIRCLES & COLLABORATION - **ARCHITECTURE COMPLETE**

- [x] **Realm architecture supports this (SHARED type)**
- [x] **Realm membership with roles (OWNER/CONTRIBUTOR/OBSERVER)**
- [ ] Shared realm workflows
- [ ] Consent-based collective synthesis
- [ ] Signal opt-in to shared realms
- [ ] Collaborative editing
- [ ] Real-time updates across realm members

---

## 🔜 PHASE 6: ADVANCED FEATURES

- [ ] Export/import capabilities (JSON, Markdown, Archive formats)
- [ ] Plugin system for custom integrations
- [ ] Webhook support for external triggers
- [ ] Backup and restore utilities
- [ ] Data migration tools (from other platforms)
- [ ] Analytics and insights dashboard
- [ ] Type-specific field builders (replace JSON editors)

---

## 🔜 PHASE 7: ECOSYSTEM & INTEGRATION

- [ ] Public API for third-party developers
- [ ] CLI tools for batch operations
- [ ] Desktop app (Electron)
- [ ] Browser extensions for signal capture
- [ ] Integration with mapping services
- [ ] Offline-first capabilities with sync
- [ ] Mobile apps (iOS/Android)

---

> [Readme](/docs/readme.md) | [Roadmap](/docs/roadmap.md) | [Setup](/docs/setup.md) | [Myth](/docs/myth.md)

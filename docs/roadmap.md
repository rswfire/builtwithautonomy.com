# Autonomy System State - January 2, 2026

## Built With Autonomy

**Cognitive infrastructure for signal documentation, pattern recognition, and epistemic fidelity.**

Autonomy is an open-source platform for capturing, processing, and synthesizing lived experience into coherent knowledge structures. It treats life as a continuous stream of signals — photos, videos, audio, text, locations — and uses AI-powered metadata extraction to identify patterns and preserve truth without distortion.

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
  api/admin
    auth/
      check/route.ts              # GET user role
      login/route.ts              # POST authentication
      logout/route.ts             # POST logout
    signals/
      route.ts                    # GET list, POST create
      [id]/route.ts               # GET, PATCH, DELETE
    clusters/
      route.ts                    # GET list, POST create
      [id]/route.ts               # GET, PATCH, DELETE
    synthesis/
      route.ts                    # GET list, POST create
      [id]/route.ts               # GET, PATCH, DELETE
    users/
      route.ts                    # GET list, POST create
      [id]/route.ts               # GET, PATCH, DELETE

components/
  Icon.tsx                      # Lucide icon wrapper with whitelist
  SiteNavigation.tsx            # Unified sidebar (public + admin)
  admin/
    form-types.ts               # FieldConfig, ModelConfig interfaces
    schema-to-form.ts           # Zod introspection for form generation
    form-config.ts              # Generated form configs (minimal, may be deprecated)
    debug-schema.ts             # Debug utility for schema inspection        
    forms/
      SignalForm.tsx            # Signal-specific form
      ClusterForm.tsx           # Cluster-specific form
      SynthesisForm.tsx         # Synthesis-specific form
      UserForm.tsx              # User-specific form
      FormSection.tsx           # Reusable section wrapper
      FormField.tsx             # Reusable field wrapper
      JsonEditor.tsx            # JSON textarea with validation

lib/
  constants.ts                  # SIGNAL_TYPES, CLUSTER_TYPES, etc.
  types.ts                      # TypeScript interfaces, isPostgres flag
  db.ts                         # Prisma client singleton
  queries/
    signal.ts                   # Signal CRUD (querySignals, createSignal, etc.)
    cluster.ts                  # Cluster CRUD + hierarchy queries
    synthesis.ts                # Synthesis CRUD + polymorphic queries
    user.ts                     # User CRUD + auth (renamed from users.ts)
  validation/
    signal.ts                   # Zod schemas for signals
    cluster.ts                  # Zod schemas for clusters
    synthesis.ts                # Zod schemas for synthesis (discriminated union)
    user.ts                     # Zod schemas for users
  utils/
    auth.ts                     # requireAuth, verifyToken
    password.ts                 # hashPassword, verifyPassword (bcrypt)
    permissions.ts              # requireOwner, requireSanctum
    ulid.ts                     # ULID generation
```

### Data Models

#### Signal
```typescript
{
  signal_id: ULID (PK)
  signal_type: ENUM (TEXT, PHOTO, VIDEO, AUDIO, LOCATION, DOCUMENT, CODE, LINK, NOTE, JOURNAL, OBSERVATION)
  signal_title: string
  signal_description?: string
  signal_author: string
  signal_status: ENUM (PENDING, PROCESSING, ACTIVE, ARCHIVED)
  signal_visibility: ENUM (PUBLIC, PRIVATE, SANCTUM, SHARED)
  
  // Location - database-specific
  signal_location?: JSON (PostGIS: GeoJSON Point)
  signal_latitude?: decimal (MySQL)
  signal_longitude?: decimal (MySQL)
  
  // JSON payloads - type-specific schemas needed
  signal_metadata?: JSON
  signal_payload?: JSON
  signal_tags?: JSON (array)
  
  signal_embedding?: array[1536] (for vector search)
  stamp_created: timestamp
  stamp_updated?: timestamp
  stamp_imported?: timestamp
}
```

#### Cluster
```typescript
{
  cluster_id: ULID (PK)
  cluster_type: ENUM (TEMPORAL, SPATIAL, THEMATIC, NARRATIVE, NETWORK, HYBRID, META)
  cluster_title: string
  cluster_depth: int (hierarchy level)
  cluster_state: ENUM (DRAFT, ACTIVE, PUBLISHED, ARCHIVED)
  
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
  synthesis_history?: JSON (array of actions)
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

### Authentication Flow
1. User posts credentials to `/api/admin/auth/login`
2. Server validates, creates JWT with `{ user_id, email, role }`
3. JWT stored in httpOnly cookie
4. Protected routes call `requireAuth()` which verifies token
5. Role-based permissions via `requireOwner()` / `requireSanctum()`

### Form Architecture
- **Model-specific forms** (SignalForm, ClusterForm, etc.) - NOT generic DynamicModelForm
- Each form handles its own validation, JSON parsing, submission
- Forms use React Hook Form + Controller for JSON fields
- JSON fields pre-stringify in `formDefaults` to avoid hydration errors
- Database type detection via data structure (not isPostgres constant) to avoid SSR/client mismatch

### Schema Introspection
- `schema-to-form.ts` reads Zod schemas via `field.constructor.name`
- Detects field types: ZodEnum → select, ZodRecord/ZodArray → json, etc.
- Unwraps ZodOptional/ZodDefault/ZodNullable to get base type
- **Limitation:** Discriminated unions (synthesis) require manual config

### Query Patterns
- All queries in `lib/queries/*` use Prisma
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

### Signal Types
```typescript
SIGNAL_TYPES = ['TEXT', 'PHOTO', 'VIDEO', 'AUDIO', 'LOCATION', 'DOCUMENT', 'CODE', 'LINK', 'NOTE', 'JOURNAL', 'OBSERVATION']
```

### Signal Status
```typescript
SIGNAL_STATUS = ['PENDING', 'PROCESSING', 'ACTIVE', 'ARCHIVED']
```

### Signal Visibility
```typescript
SIGNAL_VISIBILITY = ['PUBLIC', 'PRIVATE', 'SANCTUM', 'SHARED']
```

### Cluster Types
```typescript
CLUSTER_TYPES = ['TEMPORAL', 'SPATIAL', 'THEMATIC', 'NARRATIVE', 'NETWORK', 'HYBRID', 'META']
```

### Cluster States
```typescript
CLUSTER_STATES = ['DRAFT', 'ACTIVE', 'PUBLISHED', 'ARCHIVED']
```

### Synthesis Types & Subtypes
```typescript
SYNTHESIS_TYPES = ['METADATA', 'REFLECTION']

SYNTHESIS_SUBTYPES = {
  METADATA: ['SURFACE', 'STRUCTURE', 'PATTERNS'],
  REFLECTION: ['MIRROR', 'MYTH', 'NARRATIVE']
}
```

### Polymorphic Types
```typescript
POLYMORPHIC_TYPES = ['Signal', 'Cluster']
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
- [x] CRUD operations with auth
- [x] Role-based access control
- [x] ULID-based ID generation
- [x] Password hashing and validation
- [x] Geospatial and embedding support

---

## 🔄 PHASE 2: API & AUTHENTICATION - **80% COMPLETE**

- [x] JWT/session-based authentication middleware
- [x] **Typed auth payloads (AuthPayload)**
- [x] **Login/logout with proper cookie handling**
- [x] **Redirect to login for unauthenticated users**
- [ ] REST/GraphQL API routes (partial - basic CRUD done)
- [ ] Rate limiting and request validation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] WebSocket support for real-time updates

---

## 🔄 PHASE 3: FRONTEND & USER EXPERIENCE - **60% COMPLETE**

- [x] Frontend UI components (React/Next.js)
- [x] Signal creation and editing interfaces
- [x] Cluster management interfaces
- [x] Synthesis creation interfaces
- [x] **Realm selector in forms**
- [x] **Settings page**
- [ ] File upload for photos/videos/audio ← **NEXT BIG FEATURE**
- [ ] Interactive maps for geospatial signals
- [ ] Advanced search and filter interfaces
- [ ] Timeline/calendar visualizations
- [ ] Mobile-responsive design (partial)
- [ ] Progressive Web App (PWA) support
- [ ] Native mobile app (iOS/Android)

---

## 🔜 PHASE 4: AI & SYNTHESIS - **NOT STARTED**

- [ ] Real-time synthesis generation
- [ ] Open-source AI reflection pipeline
- [ ] Embedding generation for semantic search
- [ ] Vector similarity queries
- [ ] Pattern detection across signals
- [ ] Clustering algorithms (temporal, spatial, thematic)
- [ ] Automated tagging and metadata extraction
- [ ] **Remnant**: AI field companion trained on Autonomy data

---

## 🔜 PHASE 5: CIRCLES & COLLABORATION - **ARCHITECTURE READY**

- [x] **Realm architecture supports this (SHARED type)**
- [ ] Shared realms with multiple members
- [ ] Consent-based collective synthesis
- [ ] Signal opt-in to shared realms
- [ ] Granular permissions (OWNER/CONTRIBUTOR/OBSERVER)
- [ ] Collaborative editing
- [ ] Comments and annotations
- [ ] Real-time updates across realm members

---

## 🔜 PHASE 6: ADVANCED FEATURES

- [ ] Export/import capabilities (JSON, Markdown, Archive formats)
- [ ] Plugin system for custom integrations
- [ ] Webhook support for external triggers
- [ ] Backup and restore utilities
- [ ] Data migration tools (from other platforms)
- [ ] Analytics and insights dashboard

---

## 🔜 PHASE 7: ECOSYSTEM & INTEGRATION

- [ ] Public API for third-party developers
- [ ] CLI tools for batch operations
- [ ] Desktop app (Electron)
- [ ] Browser extensions for signal capture
- [ ] Integration with mapping services
- [ ] Offline-first capabilities with sync

---

> [Readme](/docs/readme.md) | [Roadmap](/docs/roadmap.md) | [Setup](/docs/setup.md) | [Myth](/docs/myth.md)

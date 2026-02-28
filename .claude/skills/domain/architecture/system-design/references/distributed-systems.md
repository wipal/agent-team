# Distributed Systems Fundamentals

## Core Concepts

### What is a Distributed System?
A distributed system is a collection of independent computers that appears to its users as a single coherent system.

### Why Distributed Systems?
- **Scalability** - Handle more load than a single machine
- **Fault Tolerance** - Continue operating despite failures
- **Geographic Distribution** - Serve users from nearby locations
- **Cost** - Commodity hardware vs specialized machines

## CAP Theorem Deep Dive

### The Trade-off
```
        Consistency (C)
             │
        ┌────┴────┐
        │         │
   Availability  Partition
       (A)      Tolerance (P)
        │         │
        └────┬────┘
             │
```

### CP Systems (Consistency + Partition Tolerance)
- Block requests during partition to maintain consistency
- Examples: MongoDB, Redis, HBase, BigTable
- Use when: Financial systems, inventory management

### AP Systems (Availability + Partition Tolerance)
- Continue serving during partition, may return stale data
- Examples: Cassandra, DynamoDB, CouchDB, Riak
- Use when: Social media, content delivery, shopping carts

### CA Systems (Consistency + Availability)
- Only possible without partitions (single datacenter, perfect network)
- Examples: Traditional RDBMS (PostgreSQL, MySQL in single-node)
- Reality: Any distributed system must handle partitions

## Consistency Models

### Strong Consistency
```
Client A: Write(X=1) ──▶ All replicas updated ──▶ Ack
                                              │
Client B: ──────────────────────────────────▶│ Read(X=1)
                                              │
                                    (Guaranteed to see X=1)
```
- All reads see the most recent write
- Implementation: Two-Phase Commit, Paxos, Raft
- Trade-off: Higher latency, lower availability

### Eventual Consistency
```
Client A: Write(X=1) ──▶ Ack (before replication)
                                              │
Client B: ──────────────────────────────────▶│ Read(X=0 or 1)
                                              │
                              (May see old or new value)

          Eventually (after replication):
Client C: ──────────────────────────────────▶│ Read(X=1)
```
- Replicas converge to same value eventually
- Implementation: Gossip protocols, anti-entropy
- Trade-off: Stale reads possible

### Causal Consistency
```
Client A: Write(X=1) ──▶
                        │
Client A: ──────────────┼──▶ Write(Y=2) [depends on X=1]
                        │           │
Client B: ──────────────┼───────────┼──▶ Read(Y=2)
                        │           │
                        └───────────┴──▶ Must also see X=1
```
- Preserves causal relationships
- Uses vector clocks or version vectors
- Trade-off: Complex implementation

## Distributed Algorithms

### Leader Election
```
Use cases:
- Single point of coordination
- Transaction ordering
- Configuration management

Algorithms:
- Bully Algorithm
- Raft Leader Election
- ZooKeeper/ZAB
```

### Consensus
```
Use cases:
- Replicated state machines
- Configuration changes
- Membership changes

Algorithms:
- Paxos (Classic, Multi-Paxos)
- Raft
- ZAB (ZooKeeper Atomic Broadcast)
- PBFT (Byzantine fault tolerant)
```

### Gossip Protocol
```
Use cases:
- Membership
- Data replication
- Failure detection

How it works:
1. Each node picks random peers
2. Exchanges state periodically
3. Information spreads exponentially
4. Eventually all nodes converge
```

## Time and Ordering

### Logical Clocks (Lamport Timestamps)
```
Rules:
1. Before local event: increment counter
2. Send message: include counter
3. Receive message: counter = max(local, received) + 1

Use: Causal ordering of events
```

### Vector Clocks
```
Each node maintains vector of counters:
- V[i] = count of events at node i
- V[i]++ for local event
- V = max(V, received) on receive

Use: Detect concurrent vs ordered events
```

### TrueTime (Spanner)
```
Google's approach to global ordering:
- GPS + atomic clocks
- Returns interval [earliest, latest]
- Wait out uncertainty for ordering

Use: Globally consistent timestamps
```

## Failure Detection

### Heartbeat-based
```
┌───────┐  ping   ┌───────┐
│ Node A│────────▶│ Node B│
│       │◀────────│       │
└───────┘  pong   └───────┘

Failure suspected if:
- No pong after N heartbeats
- Adaptive timeout based on network conditions
```

### Phi Accrual Failure Detector
```
Instead of binary alive/dead:
- Outputs suspicion level φ
- φ = -log10(probability of error)
- Higher φ = more likely failed

Advantages:
- Adapts to network conditions
- Configurable thresholds
- Used in Cassandra, Akka
```

## Common Patterns

### Two-Phase Commit (2PC)
```
Phase 1 (Prepare):
  Coordinator ──▶ "Can you commit?" ──▶ Participants
  Participants ──▶ "Yes/No" ──▶ Coordinator

Phase 2 (Commit/Abort):
  If all Yes:
    Coordinator ──▶ "Commit" ──▶ Participants
  If any No:
    Coordinator ──▶ "Abort" ──▶ Participants

Issues:
- Blocking (if coordinator fails)
- Slow (two round trips)
```

### Saga Pattern
```
Distributed transaction as sequence of local transactions:

Order Service    Payment Service    Inventory Service
     │                 │                    │
     ├──▶ Create Order │                    │
     │                 │                    │
     ├─────────────────┼──▶ Process Payment │
     │                 │                    │
     ├─────────────────┼────────────────────┼──▶ Reserve Item
     │                 │                    │
     └◀────────────────┴────────────────────┴──▶ Complete

If any step fails:
- Execute compensating transactions in reverse
```

## Further Reading

- "Designing Data-Intensive Applications" - Martin Kleppmann
- "Distributed Systems: Principles and Paradigms" - Tanenbaum & van Steen
- Jepsen.io - Analysis of distributed systems safety
- Paper: "Time, Clocks, and the Ordering of Events in a Distributed System" - Lamport

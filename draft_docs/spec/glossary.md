# Glossary

> Specification terms (§14). Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 14. Glossary

| Term | Definition |
|---|---|
| Set | A single set of a single exercise |
| Round / cycle | One pass through all exercises in a group |
| Superset | A group of exercises performed in an alternating fashion |
| `prev` | This set's result from the previous performance (from the clone source or from the most recent workout that included this exercise) |
| target | The defined goal for a set (optional, from the clone source) |
| PR | Personal record, the maximum weight in a given rep range |
| RPE | Rate of perceived exertion, 1–10, subjective difficulty |
| RIR | Reps in reserve, how many more reps could have been done (the inverse of RPE) |
| Volume | `weight × reps` sum, the workout volume metric |
| Bodyweight | An exercise where one's own weight is enough (pull-ups, push-ups) |
| Workout | A single training session: a list of exercises and groups performed in sequence |
| Workout Builder | The pre-workout screen where the user assembles the list before starting |
| Quick-add chips | Quick buttons for adding popular exercises in the Builder |
| Repeat last | Cloning the most recent completed workout |
| Choose from history | A list of all completed workouts for cloning |
| Letter label | A letter + color to distinguish multiple supersets within one workout (A, B, C) |
| Exercise picker | Shared exercise search/selection component. Add mode in Builder/Active, Browse mode in Profile (§11) |
| System exercise | An exercise from the seeded catalog. Multi-tagged by muscle groups, read-only |
| Custom exercise | A user-created exercise. Single-tag, edit/soft-delete available |
| Soft delete | Deletion via a `deletedAt` flag without cascade — the entity remains in past workouts |


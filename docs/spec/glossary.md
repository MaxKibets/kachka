# Глосарій

> Терміни специфікації (§14). Частина UI/UX-специфікації Kachka v1 — повна карта і §-індекс: [spec map](README.md).
> Поведінка описана тут; візуальна система — `../visual/README.md`.

---

## 14. Глосарій

| Термін | Визначення |
|---|---|
| Set | Один підхід однієї вправи |
| Round / cycle | Один прохід через всі вправи групи |
| Superset | Група вправ що виконуються alternating |
| `prev` | Результат цього сета з попереднього виконання (з джерела клонування або з найостаннього тренування з цією вправою) |
| target | Задана ціль для сета (опціонально, з clone-джерела) |
| PR | Personal record, максимальна вага в певному rep-діапазоні |
| RPE | Rate of perceived exertion, 1–10, суб'єктивна важкість |
| RIR | Reps in reserve, скільки ще повторів міг зробити (інверсія RPE) |
| Volume | `weight × reps` сума, метрика об'єму тренування |
| Bodyweight | Вправа де власна вага достатня (підтягування, віджимання) |
| Workout | Одна тренувальна сесія: список вправ і груп виконаний послідовно |
| Workout Builder | Pre-workout екран де юзер збирає список перед стартом |
| Quick-add chips | Швидкі кнопки додавання популярних вправ у Builder |
| Repeat last | Клонування найостаннього завершеного workout-у |
| Choose from history | Список з усіма завершеними workout-ами для клонування |
| Letter label | Літера + колір для розрізнення кількох супер-сетів в одному workout-і (A, B, C) |
| Exercise picker | Спільний компонент пошуку/вибору вправ. Add mode у Builder/Active, Browse mode у Profile (§11) |
| System exercise | Вправа з seeded каталогу. Multi-tag по muscle groups, read-only |
| Custom exercise | Юзером створена вправа. Single-tag, edit/soft-delete доступні |
| Soft delete | Видалення через `deletedAt` flag без cascade — entity лишається у past workouts |


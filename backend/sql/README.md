# WIP

## Databasen

### Tabellstruktur

Här är en översikt av tabellerna och deras relationer:

- **releases**: Sparar information om album.
- **tracks**: Sparar information om låtar.
- **sources**: Sparar information om källor.
- **samples**: Sparar information om samples.
- **track_samples_ref**: En mellanliggande tabell för relationen mellan "track" och "sample" (många till många).
- **source_samples_ref**: En mellanliggande tabell för relationen mellan "source" och "sample" (en till många).
- **format_types**: Sparar information om release-typer (Ex. Album, EP etc).
- **sample_types**: Sparar information om sample-typer (Ex. Drum loop. Movie Quote etc).
- **source_types**: Sparar information om source-typer (Ex. Movie, Song, TV etc).

### Förklaring av relationer

- **Album → Tracks**: Ett album kan ha flera spår, men varje spår tillhör ett album. Därför finns en `album_id`-foreign key i `Tracks`.
- **Tracks → Samples**: En låt kan innehålla flera samples, och ett sample kan användas i flera låtar. `Track_Samples` används för att hantera många-till-många-relationen mellan låtar och samples.
- **Sources → Samples**: En källa kan ha flera samples, men varje sample tillhör endast en källa.

### Exempel på användning

- För att lägga till en ny låt till ett album kan du skapa en post i `Tracks` med albumets ID som `album_id`.
- För att associera ett sample med en låt, skapa en post i `Track_Samples` med `track_id` och `sample_id`.
- För att koppla ett sample till en källa, skapa en post i `Source_Samples`.

---

- Hämta alla kurser för en specifik student:

```
SELECT courses.course_name
FROM courses
JOIN student_courses ON courses.course_id = student_courses.course_id
WHERE student_courses.student_id = 1;
```

- Hämta alla studenter som är registrerade på en specifik kurs:

```
SELECT students.name
FROM students
JOIN student_courses ON students.student_id = student_courses.student_id
WHERE student_courses.course_id = 101;
```

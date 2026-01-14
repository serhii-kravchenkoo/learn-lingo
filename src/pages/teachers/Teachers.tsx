import css from "./Teachers.module.css";
import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import TeacherComponent from "../../components/Teacher/Teacher";
import type { Teacher } from "../../types/teacher";
import { fetchTeachers } from "../../services/teachers";
import Loader from "../../components/Loader/Loader";
import { auth } from "../../firebase/firebaseConfig";
import { addToFavorites, getFavorites, removeFromFavorites } from "../../services/favoriteTeachers";

type Filters = { language: string; level: string; price: string };
const PAGE_SIZE = 4;

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    language: "",
    level: "",
    price: "",
  });
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFavoriteIds(new Set());
        return;
      }
      const ids = await getFavorites(user.uid);
      setFavoriteIds(new Set(ids));
    });
    return () => unsub();
  }, []);


  const toggleFavorite = async (teacherId: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Для додавання вчителя в обрані необхідно зареєструватися!");
      return;
    }
    const isFav = favoriteIds.has(teacherId);
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (isFav) next.delete(teacherId);
      else next.add(teacherId);
      return next;
    });

    try {
      if (isFav) await removeFromFavorites(user.uid, teacherId);
      else await addToFavorites(user.uid, teacherId);
    } catch {
      setFavoriteIds((prev) => new Set(prev));
    }
  };


  const loadTeachers = useCallback(async () => {
    setIsLoading(true);
    try {
      const newTeachers = await fetchTeachers(lastKey);

      if (newTeachers.length < PAGE_SIZE) setHasMore(false);

      if (newTeachers.length > 0) {
        setLastKey(newTeachers[newTeachers.length - 1].id);
        setTeachers((prev) => {
          const existingIds = new Set(prev.map((t) => t.id));
          const uniqueNewTeachers = newTeachers.filter((t) => !existingIds.has(t.id));
          return [...prev, ...uniqueNewTeachers];
        });
      }
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [lastKey]);


  const applyFilters = useCallback(
    (list: Teacher[]) => {
      return list.filter((t) => {
        if (filters.language && !t.languages.includes(filters.language)) return false;
        if (filters.price) {
          const maxPrice = Number(filters.price);
          if (t.price_per_hour > maxPrice) return false;
        }
        if (filters.level && !t.levels.includes(filters.level)) return false;
        return true;
      });
    },
    [filters]
  );

  const filteredTeachers = applyFilters(teachers);


  useEffect(() => {
    if (teachers.length === 0 && !isLoading) {
      loadTeachers();
    }
  }, [teachers.length, isLoading, loadTeachers]);


  useEffect(() => {
    if (isLoading || !hasMore) return;
    const filtered = applyFilters(teachers);
    if (filtered.length === 0 && teachers.length > 0) {
      loadTeachers();
    }
  }, [teachers, applyFilters, isLoading, hasMore, loadTeachers]);

  return (
    <section className={css.teachers}>
      <div className={css.teachersContainer}>

        <div className={css.filtersBox}>
          <div className={css.languagesBox}>
            <label htmlFor="languages">Languages</label>
            <select
              name="languages"
              id="languages"
              value={filters.language}
              onChange={(e) => setFilters((prev) => ({ ...prev, language: e.target.value }))}
            >
              <option value="">All</option>
              <option value="English">English</option>
              <option value="German">German</option>
              <option value="Spanish">Spanish</option>
              <option value="Italian">Italian</option>
              <option value="French">French</option>
              <option value="Korean">Korean</option>
              <option value="Mandarin Chinese">Mandarin Chinese</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
          </div>

          <div className={css.levelBox}>
            <label htmlFor="level">Level of knowledge</label>
            <select
              name="level"
              id="level"
              value={filters.level}
              onChange={(e) => setFilters((prev) => ({ ...prev, level: e.target.value }))}
            >
              <option value="">All</option>
              <option value="A1 Beginner">A1 Beginner</option>
              <option value="A2 Elementary">A2 Elementary</option>
              <option value="B1 Intermediate">B1 Intermediate</option>
              <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
              <option value="C1 Advanced">C1 Advanced</option>
              <option value="C2 Proficient">C2 Proficient</option>
            </select>
          </div>

          <div className={css.priceBox}>
            <label htmlFor="price">Price</label>
            <select
              name="price"
              id="price"
              value={filters.price}
              onChange={(e) => setFilters((prev) => ({ ...prev, price: e.target.value }))}
            >
              <option value="">All</option>
              <option value="10">10 $</option>
              <option value="20">20 $</option>
              <option value="30">30 $</option>
              <option value="40">40 $</option>
            </select>
          </div>
        </div>


        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ul className={css.teachersList}>
            {filteredTeachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherComponent
                  teacher={teacher}
                  selectedLevel={filters.level}
                  isFavorite={favoriteIds.has(teacher.id)}
                  onToggleFavorite={() => toggleFavorite(teacher.id)}
                />
              </li>
            ))}
            <li style={{ display: "flex", justifyContent: "center", width: "1184px", alignItems: "center" }}>
              {isLoading && <Loader />}
            </li>
          </ul>

          {hasMore && !isLoading && (
            <div style={{ width: "188px", alignSelf: "center" }}>
              <button type="button" onClick={loadTeachers} className={css.moreBtn}>
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
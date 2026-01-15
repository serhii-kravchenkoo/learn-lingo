import { useState } from "react";
import css from "./Teacher.module.css";
import Modal from "../Modal/Modal";
import type { Teacher } from "../../types/teacher";
import BookForm from "../BookForm/BookForm";

interface Props {
  teacher: Teacher;
  selectedLevel: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function TeacherComponent({
  teacher,
  selectedLevel,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const [loadMore, setLoadMore] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);

  return (
    <div className={css.teacherContainer}>
      <div className={css.avatarBox}>
        <img
          src={teacher.avatar_url}
          alt="Teacher's avatar"
          className={css.avatar}
        />
        <svg width={12} height={12}>
          <use href="/sprite.svg#greenround" />
        </svg>
      </div>
      <div className={css.container}>
        <div className={css.box}>
          <p>Languages</p>
          <div className={css.wrapper}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg
                width={16}
                height={16}
                style={{ stroke: "black", fill: "transparent" }}
              >
                <use href="/sprite.svg#book-open-01" />
              </svg>
              <p>Lessons online</p>
            </div>
            <p>Lessons done: {teacher.lessons_done}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#star" />
              </svg>
              <p> Rating:{teacher.rating}</p>
            </div>
            <p>
              Price / 1 hour:&nbsp;
              <span style={{ color: "#38cd3eff" }}>
                {teacher.price_per_hour}$
              </span>
            </p>
          </div>
          <button onClick={onToggleFavorite} className={css.heartBtn}>
            <svg
              width={26}
              height={26}
              className={isFavorite ? css.favorite : css.heart}
            >
              <use href="/sprite.svg#heart" />
            </svg>
          </button>
        </div>
        <h2>
          {teacher.name}&nbsp;{teacher.surname}
        </h2>
        <div className={css.teacherInfoBox}>
          <p>
            Speaks:
            <span style={{ textDecoration: "underline" }}>
              {teacher.languages.join(",")}
            </span>
          </p>
          <p>
            Lesson info:
            <span>{teacher.lesson_info}</span>
          </p>
          <p>
            Conditions:
            <span>{teacher.conditions}</span>
          </p>
        </div>
        {!loadMore && (
          <button
            className={css.readMoreBtn}
            onClick={() => setLoadMore(!loadMore)}
          >
            Read more
          </button>
        )}
        {loadMore && (
          <div>
            <p className={css.experience}>{teacher.experience}</p>
            <ul className={css.reviewsList}>
              {teacher.reviews.map(
  (
    { comment, reviewer_name, reviewer_rating, reviewer_avatar },
    index
  ) => (
                  <li className={css.review} key={index}>
                    <div>
                      <div className={css.reviewerAvatar}>
                        <img src={reviewer_avatar} alt={`${reviewer_name} avatar`} style={{ display: "block", width: "44px", height: "44px", borderRadius: "100px", border: "none" }} />
                      </div>
                      <div>
                        <p className={css.revierName}>{reviewer_name}</p>
                        <div className={css.reviewRating}>
                          <svg width={16} height={16}>
                            <use href="/sprite.svg#star" />
                          </svg>
                          <span>{reviewer_rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <p>{comment}</p>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        <ul className={css.levelsList}>
          {teacher.levels.map((item, index) => (
            <li
              key={index}
              className={`${selectedLevel === item ? css.activeLevel : ""}`}
            >
              #{item}
            </li>
          ))}
        </ul>
        {loadMore && (
  <div className={css.btnBox}>
    <button type="button" onClick={() => { setIsBookOpen(true) }} className={css.trialBtn}>
      Book trial lesson
    </button>
  </div>
)}
      </div>
      {isBookOpen && (
        <Modal
          onClose={() => setIsBookOpen(false)}
          children={<BookForm teacher={teacher} />}
        />
      )}
    </div>
  );
}
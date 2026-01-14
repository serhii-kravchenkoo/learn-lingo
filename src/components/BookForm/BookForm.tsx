
import type { Teacher } from "../../types/teacher";
import css from "./BookForm.module.css";

type Props = {
  teacher: Teacher;
};

export default function BookForm({ teacher }: Props) {
  const handleSubmit = () => {
    alert("Your request is being processed.");
  };
  return (
    <div className={css.bookForm}>
      <h2>Book trial lesson</h2>
      <p>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={css.teacher}>
        <div className={css.teacherAva}>
          <img src={teacher.avatar_url} alt="teacher avatar" />
        </div>
        <div className={css.teacherName}>
          <p>Your teacher</p>
          <span>
            {teacher.name} {teacher.surname}
          </span>
        </div>
      </div>
      <form className={css.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>What is your main reason for learning English?</legend>
          <label>
            <input type="radio" name="reason" value="career" defaultChecked />
            <svg width={24} height={24} className={css.radio}>
              <use href="/sprite.svg#RadioButton" />
            </svg>
            <svg width={24} height={24} className={css.ring}>
              <use href="/sprite.svg#ring" />
            </svg>
            Career and business
          </label>
          <label>
            <input type="radio" name="reason" value="kids" />
            <svg width={24} height={24} className={css.radio}>
              <use href="/sprite.svg#RadioButton" />
            </svg>
            <svg width={24} height={24} className={css.ring}>
              <use href="/sprite.svg#ring" />
            </svg>
            Lesson for kids
          </label>
          <label>
            <input type="radio" name="reason" value="abroad" />
            <svg width={24} height={24} className={css.radio}>
              <use href="/sprite.svg#RadioButton" />
            </svg>
            <svg width={24} height={24} className={css.ring}>
              <use href="/sprite.svg#ring" />
            </svg>
            Living abroad
          </label>
          <label>
            <input type="radio" name="reason" value="exams" />
            <svg width={24} height={24} className={css.radio}>
              <use href="/sprite.svg#RadioButton" />
            </svg>
            <svg width={24} height={24} className={css.ring}>
              <use href="/sprite.svg#ring" />
            </svg>
            Exams and coursework
          </label>
          <label>
            <input type="radio" name="reason" value="travel" />
            <svg width={24} height={24} className={css.radio}>
              <use href="/sprite.svg#RadioButton" />
            </svg>
            <svg width={24} height={24} className={css.ring}>
              <use href="/sprite.svg#ring" />
            </svg>
            Culture, travel or hobby
          </label>
        </fieldset>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="tel" placeholder="Phone number" required />
        <button type="submit" className={css.bookBtn}>Book</button>
      </form>
    </div>
  );
}
import fs from "fs";

const teachers = JSON.parse(
  fs.readFileSync("./teachers.json", "utf-8")
);

let avatarId = 30;

teachers.forEach(teacher => {
  teacher.reviews.forEach(review => {
    review.reviewer_avatar = `https://ftp.goit.study/img/avatars/${avatarId--}.jpg`;
  });
});

fs.writeFileSync(
  "./teachers.with.avatars.json",
  JSON.stringify(teachers, null, 2)
);

console.log("✅ teachers.with.avatars.json created");

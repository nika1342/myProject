const yearField = document.getElementById("year");
const monthField = document.getElementById("month");
const dayField = document.getElementById("day");
const output = document.getElementById("output");
const countdown = document.getElementById("countdown");
const gender = document.querySelector('input[name="gender"]:checked');


const today = new Date();
const currentYear = today.getFullYear();
const minYear = currentYear - 100;

let hasTouchedYear = false;

yearField.addEventListener("keydown", function (e) {
  if ((e.key === "ArrowDown" || e.key === "-") && !hasTouchedYear) {
    e.preventDefault();
    yearField.value = minYear;
    hasTouchedYear = true;
  }
});

yearField.addEventListener("input", () => {
  hasTouchedYear = true;
});

document.getElementById("check").addEventListener("click", function () {
  const year = parseInt(yearField.value);
  const month = parseInt(monthField.value);
  const day = parseInt(dayField.value);

  let hasError = false;

  // Reset styles
  yearField.classList.remove("error");
  monthField.classList.remove("error");
  dayField.classList.remove("error");

  let errorMessages = [];

  if (isNaN(year) || year < minYear || year > currentYear) {
    hasError = true;
    yearField.classList.add("error");
    errorMessages.push(`წელი უნდა იყოს ${minYear}-${currentYear}`);
  }

  if (isNaN(month) || month < 1 || month > 12) {
    hasError = true;
    monthField.classList.add("error");
    errorMessages.push("თვე უნდა იყოს 1-დან 12-მდე");
  }

  if (isNaN(day) || day < 1 || day > 31) {
    hasError = true;
    dayField.classList.add("error");
    errorMessages.push("დღე უნდა იყოს 1-დან 31-მდე");
  }

  if (hasError) {
    output.innerText = `შეცდომა:\n- ${errorMessages.join("\n- ")}`;
    countdown.innerText = "";
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  let age = currentYear - year;

  // თუ დაბადების დღე ჯერ არ დამდგარა წელს
  const birthdayThisYear = new Date(currentYear, month - 1, day);
  if (
    today.getMonth() < month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() < day)
  ) {
    age--;
  }

  // ზოდიაქოს დასახელება
  const zodiac = getZodiacSign(month, day);
  const season = getSeason(month);

  // Leap year
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const leapText = isLeap
    ? "თქვენ დაიბადეთ ნაკიან წელიწადში."
    : "თქვენ დაიბადეთ ჩვეულებრივ წელიწადში.";

  output.innerText = `ზოდიაქო: ${zodiac}, ${season} თვეა, თქვენ ხართ ${age} წლის. ${leapText}`;

  // დაბადების დღის დათვლა
  let nextBirthday = new Date(currentYear, month - 1, day);

  if (
    today.getMonth() > nextBirthday.getMonth() ||
    (today.getMonth() === nextBirthday.getMonth() &&
      today.getDate() > nextBirthday.getDate())
  ) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  
  if (
    today.getDate() === nextBirthday.getDate() &&
    today.getMonth() === nextBirthday.getMonth()
  ) {
    countdown.innerText = `🎉 გილოცავ დაბადების დღეს! 🎂`;
  } else {
    const diffTime = nextBirthday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    countdown.innerText = `დაბადების დღემდე დარჩენილია ${diffDays} დღე.`;
  }
});

function getZodiacSign(month, day) {
  const zodiac = [
    ["Capricorn", 1, 19],
    ["Aquarius", 1, 20],
    ["Aquarius", 2, 18],
    ["Pisces", 2, 19],
    ["Pisces", 3, 20],
    ["Aries", 3, 21],
    ["Aries", 4, 19],
    ["Taurus", 4, 20],
    ["Taurus", 5, 20],
    ["Gemini", 5, 21],
    ["Gemini", 6, 20],
    ["Cancer", 6, 21],
    ["Cancer", 7, 22],
    ["Leo", 7, 23],
    ["Leo", 8, 22],
    ["Virgo", 8, 23],
    ["Virgo", 9, 22],
    ["Libra", 9, 23],
    ["Libra", 10, 22],
    ["Scorpio", 10, 23],
    ["Scorpio", 11, 21],
    ["Sagittarius", 11, 22],
    ["Sagittarius", 12, 21],
    ["Capricorn", 12, 22],
  ];

  for (let i = 0; i < zodiac.length; i++) {
    const [sign, m, d] = zodiac[i];
    if (month === m && day <= d) return sign;
  }

  return "Capricorn";
}

function getSeason(month) {
  if ([12, 1, 2].includes(month)) return "ზამთრის";
  if ([3, 4, 5].includes(month)) return "გაზაფხულის";
  if ([6, 7, 8].includes(month)) return "ზაფხულის";
  if ([9, 10, 11].includes(month)) return "შემოდგომის";
}

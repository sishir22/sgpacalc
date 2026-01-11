// Fixed grade points as per relative grading regulation
const gradeMap = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "P": 4,
    "F": 0
};

// Subjects and credits
const subjects = [
    { name: "FLAT", credits: 3 },
    { name: "DBMS", credits: 4 },
    { name: "Software Engineering", credits: 4 },
    { name: "DAA", credits: 3 },
    { name: "Program Elective", credits: "select" },
    { name: "OE", credits: 3 },
    { name: "MB", credits: 3 }
];

// Grade dropdown options (NO decimals, NO percentiles)
const gradeOptions = `
<option value="">Select Grade</option>
<option>O</option>
<option>A+</option>
<option>A</option>
<option>B+</option>
<option>B</option>
<option>C</option>
<option>P</option>
<option>F</option>
`;

const container = document.getElementById("subjects");

// Render subject cards
subjects.forEach((sub, i) => {
    container.innerHTML += `
        <div class="subject">
            <h3>${sub.name} (${sub.credits === "select" ? "3 / 4" : sub.credits} Credits)</h3>

            ${sub.credits === "select" ? `
                <label>Credits</label>
                <select id="cred_${i}">
                    <option value="">Select Credits</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            ` : ""}

            <div class="grid">
                <div>
                    <label>Sessional 1 (30%)</label>
                    <select class="s1" id="s1_${i}">${gradeOptions}</select>
                </div>

                <div>
                    <label>Sessional 2 (45%)</label>
                    <select class="s2" id="s2_${i}">${gradeOptions}</select>
                </div>

                <div>
                    <label>Learning Engagement (25%)</label>
                    <select class="le" id="le_${i}">${gradeOptions}</select>
                </div>
            </div>
        </div>
    `;
});

function calculateSGPA() {
    let totalGradePoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < subjects.length; i++) {
        let credits = subjects[i].credits === "select"
            ? document.getElementById(`cred_${i}`).value
            : subjects[i].credits;

        let s1 = document.getElementById(`s1_${i}`).value;
        let s2 = document.getElementById(`s2_${i}`).value;
        let le = document.getElementById(`le_${i}`).value;

        if (!credits || !s1 || !s2 || !le) {
            alert("Please select all grades and credits.");
            return;
        }

        // 30–45–25 model on RELATIVE grades
        let finalGradePoint =
            gradeMap[s1] * 0.30 +
            gradeMap[s2] * 0.45 +
            gradeMap[le] * 0.25;

        totalGradePoints += finalGradePoint * credits;
        totalCredits += Number(credits);
    }

    // CLAD
    let cladGrade = document.getElementById("clad").value;
    if (!cladGrade) {
        alert("Please select CLAD grade.");
        return;
    }

    totalGradePoints += gradeMap[cladGrade] * 1;
    totalCredits += 1;

    let sgpa = (totalGradePoints / totalCredits).toFixed(2);

    document.getElementById("result").innerText =
        `SGPA: ${sgpa}  |  Total Credits: ${totalCredits}`;
}

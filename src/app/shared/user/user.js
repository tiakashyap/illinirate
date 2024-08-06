const firstYear = 2014;
const currentYear = (new Date()).getFullYear();
const Years = []
for (let year = firstYear; year <= currentYear; year++) {
    Years.push(year);
}

Years.reverse();

const Semesters = ["Spring", "Summer", "Fall", "Winter"];

export { Years, Semesters };
// Get all the necessary elements
const container = document.querySelector(".container");

const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

const dayLabel = document.querySelector(".dayLabel");
const monthLabel = document.querySelector(".monthLabel");
const yearLabel = document.querySelector(".yearLabel");

const dayError = document.querySelector(".dayError");
const monthError = document.querySelector(".monthError");
const yearError = document.querySelector(".yearError");

const date__Text_years = document.querySelector('.date__Text_years')
const date__Text_months = document.querySelector('.date__Text_months')
const date__Text_days = document.querySelector('.date__Text_days')
// Handle display or hiding the error elements
const errorHandler = (element, elementLabel, errorElement, innerHtmlText, add) => {
    if (add) {
        element.classList.add("error");
        elementLabel.classList.add("error");
    } else {
        element.classList.remove("error");
        elementLabel.classList.remove("error");
    }
    errorElement.innerHTML = innerHtmlText;
};

// Listen for input on the dayInput and validate the input
dayInput.addEventListener('input', () => {

    if (!isNaN(parseInt(dayInput.value))) {
        if (parseInt(dayInput.value) > 0 && parseInt(dayInput.value) < 32) {
            errorHandler(dayInput, dayLabel, dayError, "", false);
        } else {
            errorHandler(dayInput, dayLabel, dayError, "Must be a valid day", true);
        }
    } else {
        errorHandler(dayInput, dayLabel, dayError, "Must be a valid day", true)
    }

})

// Listen for input on the monthInput and validate the input
monthInput.addEventListener('input', () => {
    if (!isNaN(parseInt(monthInput.value))) {
        if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) < 13) {
            errorHandler(monthInput, monthLabel, monthError, "", false);
        } else {
            errorHandler(monthInput, monthLabel, monthError, "Must be a valid month", true);
        }
    } else {
        errorHandler(monthInput, monthLabel, monthError, "Must be a valid month", true);
    }
})

// Listen for input on the yearInput and validate the input
yearInput.addEventListener('input', () => {

    if (!isNaN(parseInt(yearInput.value))) {
        if (parseInt(yearInput.value) > new Date().getFullYear()) {
            errorHandler(yearInput, yearLabel, yearError, "Must be in the past", true);
        } else {
            errorHandler(yearInput, yearLabel, yearError, "", false);
        }
    } else {
        errorHandler(yearInput, yearLabel, yearError, "Must be a valid year", true);
    }
})

const animate =(element, targetValue) => {

    let count = 0;
    if (count === 0) {
        count = 1;
        let width = 1
        let id = setInterval(frame, 10);

        function frame() {
            if (width >= targetValue) {
                clearInterval(id)
                count = 0
            } else {
                width++
                element.innerText = width
            }
        }

    }
}

// Handle submission of the form
container.addEventListener("submit", function (event) {
    event.preventDefault();

    const dateString = `${parseInt(dayInput.value)}/${parseInt(monthInput.value)}/${parseInt(yearInput.value)}`

    const birthDate = new Date(parseInt(yearInput.value), parseInt(monthInput.value) - 1, parseInt(dayInput.value));
    const todayDate = new Date();


    function isValidDate(dateString) {
        // Split the input string into dayInput, monthInput, and yearInput parts
        let parts = dateString.split('/');
        let nday = parseInt(parts[0], 10);
        let nmonth = parseInt(parts[1], 10);
        let nyear = parseInt(parts[2], 10);

        // Create a new Date object using the provided values
        let dateObject = new Date(nyear, nmonth - 1, nday);

        // Check if the parsed date matches the original input and is a valid date
        return (dateObject.getDate() === nday && dateObject.getMonth() === (nmonth - 1) && dateObject.getFullYear() === nyear);
    }


    if (!dayInput.value || !monthInput.value || !yearInput.value) {
        if (!dayInput.value) {
            errorHandler(dayInput, dayLabel, dayError, "This Field is required", true);
        } else {
            errorHandler(dayInput, dayLabel, dayError, " ", false);
        }

        if (!monthInput.value) {
            errorHandler(monthInput, monthLabel, monthError, "This Field is required", true);
        } else {
            errorHandler(monthInput, monthLabel, monthError, "", false);
        }

        if (!yearInput.value) {
            errorHandler(yearInput, yearLabel, yearError, "This Field is required", true);
        } else {
            errorHandler(yearInput, yearLabel, yearError, "", false);
        }
    } else {
        if (!isValidDate(dateString)) {
            errorHandler(yearInput, yearLabel, yearError, '', true)
            errorHandler(monthInput, monthLabel, monthError, '', true)
            errorHandler(dayInput, dayLabel, dayError, 'Must be a valid date', true)
        } else {
            let ageYearDiff = todayDate.getFullYear() - birthDate.getFullYear();
            let ageMonthDiff = (todayDate.getMonth() - birthDate.getMonth());
            let ageDateDiff = todayDate.getDate() - birthDate.getDate();

            console.log(todayDate, 'today Date', todayDate.getDay());
            if (ageMonthDiff < 0) {
                ageYearDiff--
                const oldMonthDifference = ageMonthDiff
                ageMonthDiff = 12 - Math.abs(oldMonthDifference)
            }
            if (ageDateDiff < 0) {
                ageMonthDiff--
                ageDateDiff = 30 - Math.abs(ageDateDiff)
            }

            animate(date__Text_years, Number(ageYearDiff))
            animate(date__Text_months, ageMonthDiff)
            animate(date__Text_days, ageDateDiff)

        }
    }


});



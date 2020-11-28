const firstnames = ["Mark", "James", "Alison", "Mary"];
const lastnames = ["Smith", "Roberts", "Brown", "Williams"]
const prices = [100, 200, 300];
const paidOptions = ["true", "false"];
const additionalOptions = ["Cake", "Breakfast", "Tea", "Coffee", "Newspaper"];


const pickRandomItem = (array) => {
    let randomValue = Math.random()
    let randomIndex = Math.floor(randomValue * array.length);
    return array[randomIndex];
}

const generateRandomName = () => {

    let firstname = pickRandomItem(firstnames);
    let lastname = pickRandomItem(lastnames);
    let totalPrice = pickRandomItem(prices);
    let depositPaid = pickRandomItem(paidOptions);
    let additionalNeeds = pickRandomItem(additionalOptions);

    console.log(firstname);
    console.log(lastname);
    console.log(totalPrice);
    console.log(depositPaid);
    console.log(additionalNeeds);
}

generateRandomName();
generateRandomName();
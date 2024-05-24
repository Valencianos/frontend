const peanuts = prompt();
const peanut = peanuts.split(' ');
const [n, m, k] = peanut;
if (n * m >= k) {
    console.log('YES');
} else {
    console.log('NO');
}
export const cardControl = {
    cartData: JSON.parse(localStorage.getItem('cart') || '[]'),
    addCart () {
        this.cartData.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cartData))
    },
    removeCart () {
        //todo!!
    }
}
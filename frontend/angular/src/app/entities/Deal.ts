export class Deal {

    constructor(
        public typeId: number,
        public volume: number,
        public buyPrice: number,
        public sellPrice: number,
        public fees: number
    ) { }

    get profit() {
        return this.volume * (this.sellPrice - this.buyPrice) - this.fees;
    }

}

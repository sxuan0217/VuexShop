<template>
  <div class="container d-flex">
    <div v-for="item in product" class="card" style="width:25%;">
      <div class="card-body">
        <h4 class="card-title">{{item.name}}</h4>
        <p class="card-text">{{item.price}}</p>
        <a href="#" class="btn btn-outline-primary" @click="selectBuy(item)">購買</a>
        <a href="#" class="btn btn-outline-primary" @click="delBuy(item)">取消</a>
      </div>
    </div>
    <!-- <div class="show" v-for="show in selected">{{show.name}}</div> -->
    {{total}}
  </div>
</template>

<script>
var itemRef = firebase.database().ref('/product/')

export default {
  name: 'hello2',
  data() {
    return {
      product: [],
      cart: [],
      totalPrice:0
    }
  }, methods: {
    selectBuy(item) {
      event.preventDefault();
      let vm = this
      vm.cart.push(item)
      vm.count()
    },
    delBuy(item) {
      event.preventDefault();
      let vm = this
      let oldTotal = vm.totalPrice
      let newTotal = (oldTotal - item.price)
      vm.totalPrice = newTotal
    } ,
    count() {
      let vm = this
      let test = [0]
      let selectLength = vm.cart.length
      for (let i = 0; i < selectLength; i++) {
        test.push(vm.cart[i].price)
      }
      let total = test.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      vm.totalPrice = total
      return vm.totalPrice

    }
  },

  computed: {
    total() {
      let vm = this
      return vm.totalPrice
    }
  },
  mounted() {
    let vm = this
    itemRef.on('value', function(snapshot) {
      let val = snapshot.val();
      let arr = Object.keys(val).map(function(i) { return val[i] });
      vm.product = arr
    });
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Hello {
  display: flex;
}

h1,
h2 {
  font-weight: normal;
  text-align: center;
  color: #35495E;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

img {
  height: 200px;
  width: 200px;
  border-radius: 50%
}
</style>

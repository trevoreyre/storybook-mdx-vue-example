import HelloWorld from "./HelloWorld.vue";

export default {
  title: "HelloWorld Stories",
  component: HelloWorld
};

export const basic = () => ({
  components: { HelloWorld },
  template: `<HelloWorld msg="HelloWorld Stories" />`
});

import { watch } from "vue";

function PersistPiniaState(pinia) {
  // check if state is set in localstorage
  if (localStorage.getItem("state")) {
    pinia.state.value = JSON.parse(localStorage.getItem("state"));
  }

  // store state at localstorage
  watch(
    () => pinia.state.value,// getter arrow function
    (state) => {
      localStorage.setItem("state", JSON.stringify(state));
    },
    {
      deep: true,
    }
  );
}

export default PersistPiniaState;

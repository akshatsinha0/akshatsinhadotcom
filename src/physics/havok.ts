import HavokPhysics from "@babylonjs/havok";
export const initHavok=async()=>{const response=await fetch("/havok.wasm");const wasmBinary=await response.arrayBuffer();return HavokPhysics({wasmBinary})};

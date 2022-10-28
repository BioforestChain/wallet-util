import { createResolveTo } from "./resolveTo.mjs";
import { walkDir } from "./walkFile.mjs";

const resolveTo = createResolveTo(import.meta.url);

for(const walkDir(resolveTo("../src"));

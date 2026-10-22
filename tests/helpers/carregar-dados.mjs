import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

// Executa os dados TypeScript, preservando o identificador dos assets, sem carregar o runtime nativo.
export function carregarDados(arquivo) {
  const codigo = ts.transpileModule(fs.readFileSync(arquivo, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const modulo = { exports: {} };
  const requerer = (nome) => {
    if (nome.startsWith('@/assets/')) return nome;
    if (nome.startsWith('.')) return carregarDados(path.resolve(path.dirname(arquivo), `${nome}.ts`));
    throw new Error(`Dependência inesperada nos dados: ${nome}`);
  };
  vm.runInNewContext(codigo, { exports: modulo.exports, module: modulo, require: requerer }, { filename: arquivo });
  return modulo.exports;
}

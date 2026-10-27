import { Painel } from '@/components/cartoes';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Cores } from '@/constants/theme';

// Exame CMA (Certificado Médico Aeronáutico). Página aberta pelo último card da Home; conteúdo em produção.
export default function ExameCMA() {
  return (
    <Tela titulo="Exame CMA" rotulo="Certificado Médico Aeronáutico">
      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Em produção</Texto>
        <Texto cor={Cores.textoSuave}>
          Esta área vai reunir o que é preciso saber sobre o exame do Certificado Médico Aeronáutico. O conteúdo está sendo preparado a partir das normas oficiais.
        </Texto>
      </Painel>
    </Tela>
  );
}

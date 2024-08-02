import Image from "next/image";
import Link from "next/link";

const PoliticasDePrivacidadePage: React.FC = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-5" >
            <div>
                <Image src="" alt="" />
            </div>
            <h1>Termos de Uso</h1>
            <p>Sem contratos, sem compromisso</p>
            <h3>TERMOS E CONDIÇÕES GERAIS DE USO - ORGANIZZE</h3>
            <div
                className="w-1/2"
            >
                <p>Estes Termos e Condições Gerais de Uso (daqui em diante referidos apenas como &quot;Termos&quot;) se aplicam à utilização da Plataforma &quot;Organizze&quot;, por você, &quot;Usuário&quot;, através da contratação por assinatura de um dos nossos planos disponíveis no Site.</p>
                <p>A Plataforma &quot;Organizze&quot;, de legítima e exclusiva propriedade da Organizze Tecnologia Ltda. - Av. Santos Dumont, 1665 - Mailbox 409 - Santa Bárbara - Criciúma, SC - Brasil - CNPJ 35.381.093/0001-26, tem como objetivo servir como ferramenta para gestão financeira e responsabiliza você, Usuário, ao cumprimento destes Termos e Condições Gerais de Uso.</p>
                <p>Os Termos e Condições Gerais de Uso são inteiramente publicizados, desta forma, não será considerado que seja alegado desconhecimento das regras e obrigações aqui estabelecidas.</p>
                <p><strong>AO UTILIZAR A PLATAFORMA VOCÊ AUTOMATICAMENTE CONCORDA COM ESTES TERMOS E CONDIÇÕES GERAIS DE USO, QUE POSSUI NATUREZA JURÍDICA DE UM CONTRATO DE ADESÃO, RESPONSABILIZANDO-SE INTEGRALMENTE POR TODOS E QUAISQUER ATOS PRATICADOS. CASO VOCÊ NÃO CONCORDE COM QUALQUER DOS TERMOS E CONDIÇÕES ABAIXO ESTABELECIDOS, VOCÊ NÃO DEVE UTILIZAR A PLATAFORMA.</strong></p>
                <p>Este documento poderá ser periodicamente alterado, conforme a necessidade, para que se mantenha atualizado. Manteremos a versão atualizada destes termos de uso no endereço <Link target="_blank" href="https://organizze.com.br/termos-de-uso" className="link" >https://organizze.com.br/termos-de-uso</Link> e o mesmo pode ser consultado a qualquer momento, sendo que poderemos alterar este documento no site, somente visando aprimorar e melhorar os serviços prestados, no todo ou parcialmente, caso seja necessário, independente de prévio aviso. Para seu controle, você poderá ser notificado por uma mensagem via e-mail ou por outro meio de comunicação. Sempre mostramos a data da última versão no final deste documento. Ao continuar usando os serviços após as alterações, você estará concordando com os termos alterados. Se não concordar com as alterações, você deverá interromper o uso dos serviços e cancelá-los, seguindo as instruções do item &quot;Cancelamentos e Reembolsos&quot;.</p>
                <p>Este site é apenas um exemplo e não deve ser usado para fins comerciais.</p>
            </div>
        </div>
    )
}

export default PoliticasDePrivacidadePage;
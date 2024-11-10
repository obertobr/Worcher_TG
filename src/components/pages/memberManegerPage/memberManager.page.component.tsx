import MemberCard from '../../basicComponents/member-card-component/membercard.component';
import TextInputComponent from '../../basicComponents/text-input-component/text.input.component';
import './memberManegerPageContainer.css';
import './memberManegerPageContent.css';

const MemberViewPage: React.FC<{}> = () => {
  return(
    <>
      <main>
        <div className="contentMember">
          <div className='memberHeader'>
            <h2>Gerenciar Membros</h2>
            <TextInputComponent onInputChange={() => {} } placeHolder='Pesquisar Membro' typeInput='text' textLabel='Pesquisar Membro' />
          </div>

          <div className="containerMember">
            <MemberCard memberName='Lucas do Prado' memberPosition='Maneger' />
            <MemberCard memberName='Mateus J Barbosa' memberPosition='Enginer' />
            <MemberCard memberName='Vinicius Alex.' memberPosition='Agiota' />
          </div>
          
        </div>
      </main>
    </>
  )
}

export default MemberViewPage;
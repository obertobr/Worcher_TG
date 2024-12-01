import ButtonComponent from '../../basicComponents/button-component/button.components';
import HeaderComponent from '../../basicComponents/layoutComponents/header-component/header.component';
import './institutionViewPageConteiner.css';
import './institutionViewPageContent.css';
import './institutionViewPageMain.css';


import logo from "../../../assets/rafael.png"
import FooterComponent from '../../basicComponents/layoutComponents/footer-component/footer.component';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Institution from '../../../../Models/Instituition/institution.entity';
import LocalStorageLoginUtils from '../../../../Utils/LocalStorage/local.storage.login.utils';
import InstitutionService from '../../../../Service/Instituition/institution.service';
import requestEntryInterface from '../../../../Service/Instituition/membershipRequest.crud.service.interface';
import AlertComponent from '../../basicComponents/alert-component/alert.component';
import RouterUtil from '../../../../Utils/Components/RouterUtil';
import LocalStorageMemberUtils from '../../../../Utils/LocalStorage/local.storage.member.utils';
import LocalStorageInstituionUtils from '../../../../Utils/LocalStorage/local.storage.institution.utils';
import MemberService from '../../../../Service/User/member.service';
import Member from '../../../../Models/User/member.entity';
import FullScreenLoader from '../../basicComponents/layoutComponents/full-screen-loader/full.screen.loader.component';
import LocalStorageInstitutionEditUtils from '../../../../Utils/LocalStorage/local.storage.institution.edit.utils';

interface instituitionViewInterface {
}

const InstituitionViewPage: React.FC<instituitionViewInterface> = ({
}) => {

  const history = useHistory()
  const service = new InstitutionService()

  const localStorageInstitution = new LocalStorageInstituionUtils()
  const id = localStorageInstitution.getId()



  const idParsed = id
  const [instituition, setInstitution] = useState<Institution>()

  const [showModal, setShowModal] = useState(false);
  const [messagesErrorModal, setMessagesErrorModal] = useState<string[]>([])

  const localStorageInstitutionEditUtils = new LocalStorageInstitutionEditUtils()
  const localStorageMember = new LocalStorageMemberUtils()
  const [isMemberLocalStorage, setIsMemberLocalStorage] = useState<boolean>(!!localStorageMember.getItem());
  const [member, setMember] = useState<Member>()

  const [showButtonExcluirInstituicao, setShowButtonExcluirInstituicao] = useState<boolean>(false)
  const [showButtonGerenciarMembros, setShowButtonGerenciarMembros] = useState<boolean>(false)
  const [showButtonGerenciarCargos, setShowButtonGerenciarCargos] = useState<boolean>(false)
  const [showButtonGerenciarCategorias, setShowButtonGerenciarCategoria] = useState<boolean>(false)
  const [showButtonCriarEvento, setShowButtonCriarEvento] = useState<boolean>(false)

  useEffect(() => {
    loadDataInstitution()
    if (isMemberLocalStorage) {
      loadMemberPermissions()
    }
  }, [])

  useEffect(() => {
    loadPermissionButton()
  }, [member])

  const loadPermissionButton = () => {
    setShowButtonExcluirInstituicao(memberHaveIdPermission(1))
    setShowButtonGerenciarMembros(memberHaveIdPermission(2))
    setShowButtonGerenciarCargos(memberHaveIdPermission(3))
    setShowButtonCriarEvento(memberHaveIdPermission(4))
    setShowButtonGerenciarCategoria(memberHaveIdPermission(5))
  }

  const memberHaveIdPermission = (idPermission: number) => {
    const index = member?.role?.permission?.findIndex(e => e.id == idPermission)
    return index != -1 && index != undefined
  }

  const loadMemberPermissions = async () => {
    const memberService = new MemberService()
    const idMember = localStorageMember.getItem()

    if (idMember) {
      await memberService.getById(idMember).then((e) => {
        setMember(e)
      })
    }
  }

  const loadDataInstitution = async () => {
    if (idParsed) {
      const response = await service.getById(idParsed)
      setInstitution(response)
    }
  }

  const requestEntry = async () => {
    if (id) {
      const localStorageLogin = new LocalStorageLoginUtils()

      const dataRequest = new requestEntryInterface()
      dataRequest.idInstitution = idParsed
      dataRequest.userId = localStorageLogin.getIdUser()

      const response = await service.requestEntry(dataRequest)

      if (Array.isArray(response)) {
        setMessagesErrorModal(response)
        setShowModal(true)
      } else {
        RouterUtil.goToPage(history, `my-institution`)
      }
    }
  }

  const editInstitution = async () => {
    const id = await localStorageInstitution.getId()
    if (id) {
      localStorageInstitutionEditUtils.setId(id)
      RouterUtil.goToPage(history, "institution-register")
    }
  }

  const leaveInstitution = async () => {
    const localStorageMemberUtils = new LocalStorageMemberUtils()
    const memberService = new MemberService()

    const idMember = localStorageMemberUtils.getItem()

    if(idMember){
      await memberService.delete(idMember)
      localStorageMemberUtils.setItem(null)
      RouterUtil.goToPage(history,"my-institution")

    }
  }

  const deleteInstitution = async () => {
    if(instituition && instituition.id){
      const response = await service.delete(instituition.id)
      RouterUtil.goToPage(history,"my-institution")
    }
  }

  return (
    <>

      <AlertComponent
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        messages={messagesErrorModal}
        titleText={"Não foi possível fazer a solicitação de entrada"}
      />


      <HeaderComponent showCircleImageIfExistsCircleImage={true} showHome={isMemberLocalStorage} showArrowBack={!isMemberLocalStorage} type='complex' circleImage={instituition?.image?.url} showCircleImage={!!instituition}></HeaderComponent>
      <div className="contentIntView">

        {
          instituition ? (
            <>
              <main className='mainInstitutionViewPage'>
                <div className="intViewContainer">
                  <h2 className='title center'>{instituition?.name}</h2>
                  <p className='center'>{instituition?.description}</p>
                </div>

                <div className="intViewAddressContainer">
                  <h2 className='titleSecond'>ENDEREÇO</h2>
                  <p>{"Cidade: " + instituition?.address?.city?.name + ", Bairro: " + instituition?.address?.neighborhood +
                    ", Rua: " + instituition?.address?.street + ", N°: " + instituition?.address?.number + ", CEP: " +
                    instituition?.address?.cep
                  }</p>
                </div>

                <div className='codeInst'>
                  <p>Código da instituição:</p>
                  <p>{instituition?.code}</p>
                </div>

                {
                  isMemberLocalStorage && showButtonExcluirInstituicao ?
                    (
                      <ButtonComponent width='80%' text='Editar instituição' onClick={editInstitution} />
                    ) : (<></>)
                }

                {
                  isMemberLocalStorage && showButtonCriarEvento ?
                    (
                      <ButtonComponent width='80%' text='Criar Evento' onClick={() => RouterUtil.goToPage(history, "event-register")} />
                    ) : (<></>)
                }

                {
                  isMemberLocalStorage && showButtonGerenciarMembros ?
                    (
                      <ButtonComponent width='80%' text='Gerenciar Membros' onClick={() => RouterUtil.goToPage(history, "member-view")} />
                    ) : (<></>)
                }

                {
                  isMemberLocalStorage && showButtonGerenciarCategorias ?
                    (
                      <ButtonComponent width='80%' text='Gerenciar Categorias de Eventos' onClick={() => RouterUtil.goToPage(history, "eventcategorymanegerpage")} />
                    ) : (<></>)
                }

                {
                  isMemberLocalStorage && showButtonGerenciarCargos ?
                    (
                      <ButtonComponent width='80%' text='Gerenciar Cargos' onClick={() => RouterUtil.goToPage(history, "rolesmangerpage")} />
                    ) : (<></>)
                }


                {
                  !isMemberLocalStorage ? (

                    <ButtonComponent width='80%' text='Solicitar Entrada' onClick={() => requestEntry()} />
                  )

                    :

                    (
                      <ButtonComponent isCancel={true} width='80%' text='Sair da instituição' onClick={leaveInstitution} />
                    )
                }

                {
                  isMemberLocalStorage && showButtonExcluirInstituicao ?
                    (
                      <ButtonComponent isCancel={true} width='80%' text='Excluir instituição' onClick={deleteInstitution} />
                    ) : (<></>)
                }





              </main>
            </>
          )

            :

            (
              <FullScreenLoader value={instituition} />
            )

        }



      </div>
      <FooterComponent isWithinTheInstitution={isMemberLocalStorage}></FooterComponent>
    </>
  );
}

export default InstituitionViewPage;
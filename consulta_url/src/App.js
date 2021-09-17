import React, {useState} from 'react'
import LoadImg from './assets/loadImg.gif'

import{
  DivForm,
  FormInput,
  Label,
  Input,
  BtnEnvia,
  Loadimg,
  DivFormResult,
  DivFormResultTitle
}from './styledApp'


function App() {
  const [inputDados,setInputDados] = useState('')
  const [validaDados,setValidaDados] = useState(false)
  const [dadosSite , setDadosSite] = useState("")
  const [erroAnalyse, setErroAnalyse] = useState(false)
  const [load,setLoad] = useState(false)

  const handleInputChange = (event)=>{
    setInputDados(event.target.value)
  }

  async function handleSubmit(event){
    event.preventDefault()
    //Retirar o https://
    if(inputDados.indexOf('https://') >= 0 || inputDados.indexOf('http://') >= 0){
      let dadosCorrigiro = inputDados.replace(/https:\/\//g, "")
        setValidaDados(true)
        setLoad(true)
        await fetch(`/analyse/${dadosCorrigiro}`)
        .then(res=> res.json())
        .then(json => setDadosSite(json))
        .catch(erro => setErroAnalyse(true))
    }else{
      if(inputDados !== ''){
        setValidaDados(true)
        setLoad(true)
        await fetch(`/analyse/${inputDados}`)
        .then(res=> res.json())
        .then(json => setDadosSite(json))
        .catch(erro => setErroAnalyse(true))
      }else{
        setValidaDados(false)
      }
    }
  }

  if(load){
    if(dadosSite !== ""){
      return (
        <DivFormResult>
          <DivFormResultTitle>Analysing '{inputDados}'</DivFormResultTitle>
          <p>HTML Version:  <b>{dadosSite.html_version}</b></p>
          <p>Page Title:  <b>{dadosSite.title}</b></p>
          <p>External Links:  <b>{dadosSite.external_links}</b></p>
          <p>Internal Links: <b>{dadosSite.internal_links}</b></p>
        </DivFormResult>
      )
    }
    return(
      <DivForm>
        <Loadimg src={LoadImg}/>
      </DivForm>
    )
  }else{
    return (
      <DivForm>
        <FormInput onSubmit={(event)=>{handleSubmit(event)}}>
          <Label>Enter URL: 
            <Input type="text" name="site" placeholder={'www.exemplo.com'} onChange={(event)=>handleInputChange(event)}/>
            {erroAnalyse && validaDados && <p style={{color:'red', fontSize:'13px'}}>site inválido - tente www.exemplo.com</p>}
            <BtnEnvia type="submit">GO!</BtnEnvia>
          </Label>
        </FormInput>
      </DivForm>
      );
  }
}

export default App;

import {Formik, Form} from 'formik'
import {enviodatosvet,actualizaciondata} from '../api/tasks.api'

export function FormVeterinario2({valuesVeterinaryEdit,activeForm,stateForm,handleSave}) {

  
  console.log(valuesVeterinaryEdit);
  let valuesInitial;
  if(!valuesVeterinaryEdit){
    valuesInitial =  { primerNombreVet:'',
    segundoNombreVet:'',
    primerApellidoVet:'',
    segundoApellidoVet:'',
    especialidad:{
      codigoEspecialidad: '',
      tipoEspecialidad: '',
      descripcionTipo: ''
      }}
  }else{
    valuesInitial = {
      primerNombreVet:valuesVeterinaryEdit.primerNombreVet,
      segundoNombreVet:valuesVeterinaryEdit.segundoNombreVet,
      primerApellidoVet:valuesVeterinaryEdit.primerApellidoVet,
      segundoApellidoVet:valuesVeterinaryEdit.segundoApellidoVet,
      especialidad:{
        codigoEspecialidad: valuesVeterinaryEdit.especialidad.codigoEspecialidad,
        tipoEspecialidad: valuesVeterinaryEdit.especialidad.tipoEspecialidad,
        descripcionTipo: valuesVeterinaryEdit.especialidad.descripcionTipo,
        }
    }
  }
  return( 
    <div>
      <Formik  
        initialValues ={valuesInitial}
        onSubmit = {async (values, actions)=> {
          console.log(values);
          try{
            let response;
            if(!valuesVeterinaryEdit){
              response = await enviodatosvet(values);
              const veterinaries = await fetch(process.env.REACT_APP_MS_VETERINARIO2);
              const {messages,data} = await veterinaries.json();
              if(messages === 'Ok'){
                console.log("MENSAGES", messages);
                handleSave(data);
              }
              activeForm(!stateForm);
            }else{
              response = await actualizaciondata(valuesVeterinaryEdit.id,values);
              console.log(response);
              if(response.messages === 'Ok'){
                const veterinaries = await fetch(process.env.REACT_APP_MS_VETERINARIO2);
                const {messages,data} = await veterinaries.json();
                if(messages === 'Ok'){
                  console.log("MENSAGES", messages);
                  handleSave(data);
                }
              }
              activeForm(!stateForm);
            } 
              
            console.log(response)
            actions.resetForm()
          }
          catch (error){
            console.error(error)
          }
        }}
      >
        {({handleChange, handleSubmit,values})=> ( 
          <Form  className='form_pet_clinic gap-4 border border-success' onSubmit={handleSubmit}>
          <h1> {!valuesVeterinaryEdit ? "AÑADIR VETERINARIO" : "EDITAR VETERINARIO"}</h1>
        <div className='d-flex justify-content-between flex-column'>
        <label >Primer Nombre:
        </label>
          <input type='text' name='primerNombreVet' placeholder='Primer Nombre' onChange = {handleChange} value={values.primerNombreVet}/>
        </div>
          <div className='d-flex justify-content-between flex-column'>
          <label >Segundo Nombre:
          </label>
            <input type='text' name='segundoNombreVet' placeholder='Segundo Nombre' onChange = {handleChange} value={values.segundoNombreVet}/>
          </div>
 
          <div className='d-flex justify-content-between flex-column'>
          <label >Primer Apellido:
          </label>
            <input type='text' name='primerApellidoVet'  placeholder='Primer Apellido' onChange = {handleChange} value={values.primerApellidoVet}/>
          </div>

          <div className='d-flex justify-content-between flex-column'>
          <label >Segundo Apellido:
          </label>
            <input type='text' name='segundoApellidoVet'placeholder='Segundo Apellido' onChange = {handleChange} value={values.segundoApellidoVet}/>
          </div>

          <div className='d-flex justify-content-between flex-column'>
          <label >Codigo Especialidad:
          </label> 
            <input type='number' name='especialidad.codigoEspecialidad' placeholder='Especialidad' onChange = {handleChange} value={values.especialidad.codigoEspecialidad} />
          </div>

          <div className='d-flex justify-content-between flex-column'>
          <label >Especialidad:
          </label> 
            <input type='text' name='especialidad.tipoEspecialidad' placeholder='Especialidad' onChange = {handleChange} value={values.especialidad.tipoEspecialidad} />
          </div>

          <div className='d-flex justify-content-between flex-column'>
          <label >Descripcion:<br></br>
          </label> 
            <textarea rows="2" cols="50" type='text' name='especialidad.descripcionTipo' placeholder='Especialidad' onChange = {handleChange} value={values.especialidad.descripcionTipo} >
              </textarea> 
          </div>

          <button type="submit" className="w-50 mt-5 btn btn-primary">
            {!valuesVeterinaryEdit ? "Crear nuevo veterinario" : "Editar Veterinario"} 
            </button>
        </Form>)}
      </Formik>
    </div>
  );
}
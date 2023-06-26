import {Formik, Form} from 'formik'
import {enviodatosvet,actualizaciondata} from '../api/tasks.api'

export function FormVeterinario2({valuesVeterinaryEdit,activeForm,stateForm}) {

  
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
              activeForm(!stateForm);
            }else{
              response = await actualizaciondata(valuesVeterinaryEdit.id,values);
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
        <Form  className='form_pet_clinic' onSubmit={handleSubmit}>
        
        <label >Primer Nombre:
          <input type='text' name='primerNombreVet' placeholder='Primer Nombre' onChange = {handleChange} value={values.primerNombreVet}/>
        </label>

          <label >Segundo Nombre:
            <input type='text' name='segundoNombreVet' placeholder='Segundo Nombre' onChange = {handleChange} value={values.segundoNombreVet}/>
          </label>

          <label >Primer Apellido:
            <input type='text' name='primerApellidoVet'  placeholder='Primer Apellido' onChange = {handleChange} value={values.primerApellidoVet}/>
          </label>

          <label >Segundo Apellido:
            <input type='text' name='segundoApellidoVet'placeholder='Segundo Apellido' onChange = {handleChange} value={values.segundoApellidoVet}/>
          </label>

          <label >Codigo Especialidad:
            <input type='number' name='especialidad.codigoEspecialidad' placeholder='Especialidad' onChange = {handleChange} value={values.especialidad.codigoEspecialidad} />
          </label> 

          <label >Especialidad:
            <input type='text' name='especialidad.tipoEspecialidad' placeholder='Especialidad' onChange = {handleChange} value={values.especialidad.tipoEspecialidad} />
          </label> 

          <label >Descripcion:<br></br>
            <textarea rows="2" cols="50" type='text' name='especialidad.descripcionTipo' placeholder='Especialidad' onChange = {handleChange} value={values.especialidad.descripcionTipo} >
              </textarea> 
          </label> 

          <button type="submit" className="w-50 mt-5 btn btn-primary">
            {!valuesVeterinaryEdit ? "Crear nuevo veterinario" : "Editar Veterinario"} 
            </button>
        </Form>)}
      </Formik>
    </div>
  );
}
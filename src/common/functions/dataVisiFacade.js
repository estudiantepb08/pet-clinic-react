export const getObjectVisit = (formValues) => {
    const date = new Date( formValues.dateVisit);
    const isoDate = date.toISOString();
    const dataServices = {
        dateVisit:isoDate,
        pet:{
            mascotasId:formValues.pet
        },
        owner:{propietariosId:formValues.owner},
        veterinary:{veterinarioId:formValues.veterinary},
        reason:formValues.reason,
        cost:formValues.price,
        isFirstVisit:formValues.isFirstVisit === 'SI' ? true : false,
        status:formValues.status === 'ACTIVO' ? 'ACTIVE' : 'INACTIVE'
    }
    return dataServices;
}
export const getObjectEditVisit = (dataEdit) => {
    const dataServices = {
        dateVisit: dataEdit.dateVisit,
        pet: dataEdit.pet.mascotasId,
        isFirstVisit: dataEdit.isFirstVisit ? 'SI' : 'NO',
        owner: dataEdit.owner.propietariosId,
        price: Number(dataEdit.cost),
        reason: dataEdit.reason,
        status: dataEdit.status === 'ACTIVE' ? 'ACTIVO' : 'INACTIVO',
        veterinary: dataEdit.veterinary.veterinarioId
      }
      return dataServices;
}
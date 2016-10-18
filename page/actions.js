//定义一个change方法，将来把它绑定到props上
// export const CHANGE = 'CHANGE';
// export const TEST_AC = 'TEST_AC';

export const AC = {
	REINIT :'reinitiation',
	CONFIRMLOCATION :'confirmLocation'
}

export function resStatus(val){
    return{
        type:AC.RES_STATUS,
        resStatus:val
    }
}

export function confirmLocation(val){
    return{
        type:AC.CONFIRMLOCATION,
        location:val
    }
}

export function reInit(val){
    return{
        type:AC.REINIT,
        data:{
        	firstName:"Bob" + (Math.random() * 100).toFixed(2),
        	lastName:"Dylon" + (Math.random() * 100).toFixed(2)
        }
    }
}

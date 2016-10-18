const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
  return sleep(1000) // simulate server latency
    .then(() => {
		if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.userName)) {
			throw { userName: 'That username is taken' }
		}
		if(values.password !== 'form1'){
			throw { password: 'the password was wrong' }
		}
    })
}

export default asyncValidate
const {getRepoList} = require("../repo");
module.exports = async () => {
    const res = await getRepoList()
    const parsed = res?.reduce((total, currentValue,currentIndex) => (
        total + `${currentIndex + 1}. ${currentValue.templateName}\n`
    ),'\n')
    console.log(parsed)
}
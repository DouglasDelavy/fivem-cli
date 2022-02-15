import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'generate:script',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, filesystem } = toolbox

    const name = parameters.first
    if (!name) {
      print.error('You need to provide a name for the script')
      return
    }

    const copyPath = filesystem.path(__dirname, '../templates/script')
    await filesystem.copyAsync(copyPath, `./${name}`)

    print.success(`Sucessfully generated script ${name}`)
  },
}

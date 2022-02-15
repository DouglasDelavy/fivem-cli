import { GluegunToolbox } from 'gluegun'

const askScriptType = {
  type: 'select',
  name: 'scriptType',
  message: 'What type of script ?',
  choices: ['Typescript', 'C#'],
}

module.exports = {
  name: 'generate:script',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, filesystem, prompt } = toolbox

    const name = parameters.first
    if (!name) {
      print.error('You need to provide a name for the script')
      return
    }

    const { scriptType } = await prompt.ask(askScriptType)
    if (!scriptType) {
      return
    }

    const copyPath = filesystem.path(
      __dirname,
      `../templates/script/${scriptType}`
    )

    await filesystem.copyAsync(copyPath, `./${name}`)

    print.success(`Sucessfully generated script ${scriptType}`)
  },
}

import { cpSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createInterface } from 'readline'
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const rl = createInterface({ input: process.stdin, output: process.stdout })
const question = (q) => new Promise(resolve => rl.question(q, resolve))

async function main() {
    console.log('\n🚀 Creador de plantillas xyz-plantillas\n')

    const nombre = await question('📝 Nombre de la plantilla (ej: restaurante): ')

    if (!nombre.trim()) {
        console.error('❌ El nombre no puede estar vacío.')
        process.exit(1)
    }

    const origen = join(ROOT, 'packages', 'starter')
    const destino = join(ROOT, 'packages', 'plantillas', nombre.trim())

    if (!existsSync(origen)) {
        console.error('❌ No existe la carpeta packages/starter. Créala primero.')
        process.exit(1)
    }

    if (existsSync(destino)) {
        console.error(`❌ Ya existe una plantilla llamada "${nombre}".`)
        process.exit(1)
    }

    console.log(`\n📁 Copiando starter → packages/plantillas/${nombre}...`)
    cpSync(origen, destino, { recursive: true })

    console.log('📦 Instalando dependencias...')
    execSync('npm install', { cwd: destino, stdio: 'inherit' })

    console.log(`\n✅ Plantilla "${nombre}" creada con éxito!`)
    console.log(`👉 Puedes encontrarla en: packages/plantillas/${nombre}\n`)

    rl.close()
}

main()
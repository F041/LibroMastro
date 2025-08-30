import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Database, FileSpreadsheet, Users, ArrowRight, Clock, AlertTriangle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-[#164e63]" />
              <h1 className="text-2xl font-serif font-black text-[#164e63]">Libro Mastro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#come-funziona" className="text-[#334155] hover:text-[#164e63] font-sans">
                Come Funziona
              </a>
              <a href="#connettori" className="text-[#334155] hover:text-[#164e63] font-sans">
                Connettori
              </a>
              <a href="#prezzi" className="text-[#334155] hover:text-[#164e63] font-sans">
                Prezzi
              </a>
            </nav>
            <div className="flex space-x-4">
              <Button variant="outline" className="border-[#164e63] text-[#164e63] hover:bg-[#f0fdfa] bg-transparent">
                Prenota una Chiamata
              </Button>
              <Button className="bg-[#164e63] hover:bg-[#0f3a47] text-white">Inizia Prova Gratuita</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#f0fdfa] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-black text-[#164e63] mb-6 leading-tight">
            {"Basta Perdere Tempo"}
            <br />
            {"con Dati Sparsi"}
          </h1>
          <p className="text-xl text-[#334155] mb-8 max-w-3xl mx-auto font-sans leading-relaxed">
            {
              "Ciao, sono stanco di vedere imprenditori che perdono ore a copiare dati da un sistema all'altro. Libro Mastro collega la tua contabilità, il CRM e i fogli Google in automatico."
            }
            <strong>{" Così a occhio, ti farà risparmiare almeno 10 ore a settimana."}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#164e63] hover:bg-[#0f3a47] text-white px-8 py-4 text-lg">
              Inizia Prova Gratuita <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#164e63] text-[#164e63] hover:bg-[#f0fdfa] px-8 py-4 text-lg bg-transparent"
            >
              Prenota una Chiamata
            </Button>
          </div>
          <p className="text-sm text-[#334155] mt-4 font-sans">
            {"Prova gratuita di 14 giorni • Nessuna carta di credito richiesta"}
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#164e63] mb-4">Ti Riconosci in Questa Situazione?</h2>
            <p className="text-lg text-[#334155] font-sans">
              Questi sono i problemi che sento più spesso dai miei clienti:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <CardTitle className="text-lg font-serif font-bold text-red-700">Excel che Si Blocca</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#334155] font-sans">
                  {
                    '"Ho 15 fogli Excel diversi, quando ne apro più di 3 il computer va in tilt. E se sbaglio una formula, addio dati."'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-orange-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <CardTitle className="text-lg font-serif font-bold text-orange-700">Tempo Sprecato</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#334155] font-sans">
                  {
                    '"Ogni lunedì mattina perdo 3 ore a copiare i dati dalla contabilità al CRM. E spesso mi dimentico qualcosa."'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Database className="h-6 w-6 text-yellow-600" />
                  <CardTitle className="text-lg font-serif font-bold text-yellow-700">Dati Scollegati</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#334155] font-sans">
                  {
                    '"Ho i clienti nel CRM, le fatture in contabilità e i report su Google Sheets. Non riesco mai ad avere il quadro completo."'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="come-funziona" className="py-16 bg-[#f0fdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#164e63] mb-4">Ecco Come Risolviamo il Problema</h2>
            <p className="text-lg text-[#334155] font-sans max-w-2xl mx-auto">
              {"Non serve essere un informatico. Libro Mastro fa tutto in automatico, in 3 passaggi semplici:"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#164e63] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-serif font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-serif font-bold text-[#164e63] mb-3">Colleghi i Tuoi Sistemi</h3>
              <p className="text-[#334155] font-sans">
                {"Connetti la tua contabilità, il CRM e Google Sheets. Ci vogliono 5 minuti, te lo prometto."}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#164e63] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-serif font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-serif font-bold text-[#164e63] mb-3">Scegli Cosa Sincronizzare</h3>
              <p className="text-[#334155] font-sans">
                {
                  "Decidi quali dati vuoi che si aggiornino automaticamente. Clienti, fatture, pagamenti... quello che ti serve."
                }
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#164e63] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-serif font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-serif font-bold text-[#164e63] mb-3">Rilassati e Lavora</h3>
              <p className="text-[#334155] font-sans">
                {"I dati si aggiornano da soli ogni ora. Tu ti concentri sul business, non sulla burocrazia."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connectors Section */}
      <section id="connettori" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#164e63] mb-4">Connettori Disponibili</h2>
            <p className="text-lg text-[#334155] font-sans">
              Lavoriamo con i software che usi già. Niente cambiamenti drastici.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Database className="h-8 w-8 text-[#164e63]" />
                  <CardTitle className="font-serif font-bold text-[#164e63]">Contabilità</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-sans text-[#334155]">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>FattureInCloud</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Aruba Fatturazione</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>TeamSystem</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Zucchetti</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-[#164e63]" />
                  <CardTitle className="font-serif font-bold text-[#164e63]">CRM</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-sans text-[#334155]">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>HubSpot</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Salesforce</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Pipedrive</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Zoho CRM</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="h-8 w-8 text-[#164e63]" />
                  <CardTitle className="font-serif font-bold text-[#164e63]">Fogli di Calcolo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-sans text-[#334155]">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Google Sheets</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Microsoft Excel</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Airtable</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Notion Database</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="prezzi" className="py-16 bg-[#f0fdfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#164e63] mb-4">Prezzi Chiari, Senza Sorprese</h2>
            <p className="text-lg text-[#334155] font-sans">
              Paga solo per quello che usi. Niente costi nascosti, niente fregature.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-[#164e63]">Starter</CardTitle>
                <CardDescription className="font-sans text-[#334155]">Perfetto per iniziare</CardDescription>
                <div className="text-4xl font-serif font-black text-[#164e63]">
                  {"€49"}
                  <span className="text-lg font-sans font-normal text-[#334155]">/mese</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-sans text-[#334155] mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Fino a 3 connettori</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Sincronizzazione ogni ora</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Supporto email</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Dashboard base</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#164e63] hover:bg-[#0f3a47] text-white">Inizia Prova Gratuita</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#a16207] bg-gradient-to-b from-yellow-50 to-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#a16207] text-white px-4 py-1 rounded-full text-sm font-sans font-medium">
                  Più Popolare
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-bold text-[#164e63]">Professional</CardTitle>
                <CardDescription className="font-sans text-[#334155]">Per aziende in crescita</CardDescription>
                <div className="text-4xl font-serif font-black text-[#164e63]">
                  {"€99"}
                  <span className="text-lg font-sans font-normal text-[#334155]">/mese</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 font-sans text-[#334155] mb-6">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Connettori illimitati</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Sincronizzazione in tempo reale</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Supporto prioritario</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Dashboard avanzata</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Report personalizzati</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#a16207] hover:bg-[#92570a] text-white">Inizia Prova Gratuita</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#164e63] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-black mb-6">Pronto a Smettere di Perdere Tempo?</h2>
          <p className="text-xl mb-8 font-sans leading-relaxed">
            {
              "Guarda, so che cambiare abitudini non è facile. Ma se continui così, tra un anno sarai ancora qui a copiare dati a mano."
            }
            <strong>{" Prova Libro Mastro gratis per 14 giorni"}</strong> {" e vedi la differenza."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#164e63] hover:bg-gray-100 px-8 py-4 text-lg font-sans font-medium"
            >
              Inizia Prova Gratuita <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#164e63] px-8 py-4 text-lg font-sans font-medium bg-transparent"
            >
              Prenota una Chiamata
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-90 font-sans">
            {"Nessuna carta di credito richiesta • Cancelli quando vuoi • Supporto in italiano"}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#334155] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Database className="h-6 w-6" />
                <span className="text-xl font-serif font-bold">Libro Mastro</span>
              </div>
              <p className="text-gray-300 font-sans">Unifica i tuoi dati aziendali senza perdere tempo.</p>
            </div>

            <div>
              <h4 className="font-serif font-bold mb-4">Prodotto</h4>
              <ul className="space-y-2 font-sans text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Come Funziona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Connettori
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Prezzi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sicurezza
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold mb-4">Supporto</h4>
              <ul className="space-y-2 font-sans text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Centro Assistenza
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contatti
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold mb-4">Azienda</h4>
              <ul className="space-y-2 font-sans text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Chi Siamo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Termini
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center">
            <p className="text-gray-300 font-sans">© 2024 Libro Mastro. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

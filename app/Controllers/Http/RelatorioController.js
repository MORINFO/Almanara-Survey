'use strict'

const Pesquisa = use('App/Models/Pesquisa')
const Database = use('Database')
const Mail = use('Mail')

class RelatorioController {
  async relatorio({ esponse, request, params }) {

    const { Matricula, Data, Filial } = await request.all()
    console.log(Matricula,Data, Filial)

    if (Matricula == null && Data == 0 && Filial == 0) {
      console.log('ok 0')
      const pesquisa = await Database
        .select('*')
        .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%d/%m/%Y") as DiaDiagnosticado'))
        .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%H:%i:%s") as HoraDiagnosticado'))
        .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
        .select(Database.raw('DATE_FORMAT(Data, "%d/%m/%Y") as Data'))
        .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
        .table('pesquisas')
        .orderBy('Data')

      return pesquisa
    }else if (Matricula == null && Data > 0 && Filial == 0) {
      console.log('ok1')
      const pesquisa = await Database
        .select('*')
        .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%d/%m/%Y") as DiaDiagnosticado'))
        .select(Database.raw('DATE_FORMAT(Data, "%d/%m/%Y") as Data'))
        .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
        .table('pesquisas')
        .where(Database.raw('DATE_FORMAT(Data, "%m%Y")'), '=', Data)
        .orderBy('Data')

      return pesquisa

    }else if (Matricula == null && Data > 0 && Filial) {
      console.log('ok2')
      const pesquisa = await Database
        .select('*')
        .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%d/%m/%Y") as DiaDiagnosticado'))
        .select(Database.raw('DATE_FORMAT(Data, "%d/%m/%Y") as Data'))
        .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
        .table('pesquisas')
        .where(Database.raw('DATE_FORMAT(Data, "%m%Y")'), '=', Data)
        .andWhere('CodFilial', '=', Filial)
        .orderBy('Data')

      return pesquisa

    }else if (Matricula && Data==0 && Filial==0) {
      console.log('ok3')
      const pesquisa = await Database
        .select('*')
        .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%d/%m/%Y") as DiaDiagnosticado'))
        .select(Database.raw('DATE_FORMAT(Data, "%d/%m/%Y") as Data'))
        .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
        .table('pesquisas')
        .where('Matricula', '=', Matricula)
        .orderBy('Data')

      return pesquisa

    }else if (Matricula && Data > 0 && Filial==0) {
      console.log('ok3')
      const pesquisa = await Database
        .select('*')
        .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%d/%m/%Y") as DiaDiagnosticado'))
        .select(Database.raw('DATE_FORMAT(Data, "%d/%m/%Y") as Data'))
        .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
        .table('pesquisas')
        .where('Matricula', '=', Matricula)
        .andWhere(Database.raw('DATE_FORMAT(Data, "%m%Y")'), '=', Data)
        .orderBy('Data')

      return pesquisa

    }else if(Filial && Data == 0 && Matricula == null ){
      console.log('ok4')
      const pesquisa = await Database
      .select('*')
      .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%d/%m/%Y") as DiaDiagnosticado'))
      .select(Database.raw('DATE_FORMAT(Data, "%d/%m/%Y") as Data'))
      .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
      .table('pesquisas')
      .where('CodFilial', '=', Filial)
      .orderBy('Data')

    return pesquisa
    }else if(Filial && Data > 0 && Matricula == null ){
      console.log('ok5')
      const pesquisa = await Database
      .select('*')
      .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%d/%m/%Y") as DiaDiagnosticado'))
      .select(Database.raw('DATE_FORMAT(Data, "%d/%m/%Y") as Data'))
      .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
      .table('pesquisas')
      .where('CodFilial', '=', Filial)
      .andWhere(Database.raw('DATE_FORMAT(Data, "%m%Y")'), '=', Data)
      .orderBy('Data')

    return pesquisa
    }else if(Filial && Data == 0 && Matricula  ){
      console.log('ok6')
      const pesquisa = await Database
      .select('*')
      .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%d/%m/%Y") as DiaDiagnosticado'))
      .select(Database.raw('DATE_FORMAT(Data, "%d/%m/%Y") as Data'))
      .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
      .table('pesquisas')
      .where('Matricula', '=', Matricula)
      .andWhere('CodFilial', '=', Filial)
      .orderBy('Data')

    return pesquisa
    }else{
      console.log('ok7')
      const pesquisa = await Database
      .select('*')
      .select(Database.raw('DATE_FORMAT(DiaDiagnosticado, "%d/%m/%Y") as DiaDiagnosticado'))
      .select(Database.raw('DATE_FORMAT(Data, "%d/%m/%Y") as Data'))
      .select(Database.raw('DATE_FORMAT(Data, "%H:%i:%s") as Hora'))
      .table('pesquisas')
      .where(Database.raw('DATE_FORMAT(Data, "%m%Y")'), '=', Data)
      .andWhere('Matricula', '=', Matricula)
      .andWhere('CodFilial', '=', Filial)
      .orderBy('Data')

    return pesquisa
    }



  }
}

module.exports = RelatorioController

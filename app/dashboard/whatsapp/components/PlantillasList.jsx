import { Card, CardTitle } from './TabButton';

export function PlantillasList({
  tipo,
  loading,
  servicios,
  plantillas,
  selectedPlantilla,
  handleSelectPlantilla,
  getPlantillaId,
  getTiempoEnvio,
}) {
  return (
    <div className="lg:col-span-3">
      <Card>
        <CardTitle>
          Plantillas {tipo === 'whatsapp' ? 'WhatsApp' : 'Email'}
        </CardTitle>

        {loading ? (
          <div className="mt-4 flex justify-center p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-azul-principal border-t-transparent" />
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {servicios.map((servicio) => {
              const plantillasServicio = plantillas.filter(
                (p) => Number(p.id_producto) === Number(servicio.id),
              );

              return (
                <div
                  key={servicio.id}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3"
                >
                  <h3 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {servicio.nombre}
                  </h3>
                  <div className="space-y-1">
                    {[1, 2, 3].map((numero) => {
                      const plantilla = plantillasServicio.find(
                        (p) => Number(p.numero_plantilla) === Number(numero),
                      );
                      const isSelected =
                        getPlantillaId(selectedPlantilla) ===
                        getPlantillaId(plantilla);

                      return (
                        <button
                          key={numero}
                          onClick={() =>
                            plantilla && handleSelectPlantilla(plantilla)
                          }
                          disabled={!plantilla}
                          className={`w-full rounded-md px-3 py-2 text-left text-xs transition ${
                            isSelected
                              ? 'bg-azul-principal text-white'
                              : plantilla
                                ? 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {getTiempoEnvio(numero)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, {
  useState, useMemo, useContext,
} from 'react';

import { Bar, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  LinearProgress,
  Paper,
} from '@material-ui/core';

import { useParams } from 'react-router';
import { chartsNames } from '../../constants';
import { ChartButton } from '../../components/Touchables/ChartButton';

import { MapDropDown } from '../MapDropDown';
import { ChartDetail } from '../ChartDetail';
import MapDetail from '../MapDetail';

import { EmptyReportDetail } from './EmptyReportDetail';

import { useStyles } from './styles_reportModal';
import { ChartContext } from '../../context/ChartContext';
import { MapContext } from '../../context/MapContext';
import { PdfCreator } from '../../components/PdfCreator';

function ReportDetail() {
  const styles = useStyles();

  const {
    data, isLoading, chartsSelected, setChartsSelected,
  } = useContext(ChartContext);

  const { setSelectedMap, propArr } = useContext(MapContext);
  const { id } = useParams();

  const report = localStorage.getItem('report');
  const local = localStorage.getItem('reportId');
  const [dataTo, setDataTo] = useState({});

  function handleChartSelect(chartName) {
    const arr = chartsSelected;
    if (arr.includes('Mapa') && chartName === 'Mapa') {
      setSelectedMap(false);
    } else if (!arr.includes('Mapa') && chartName === 'Mapa') {
      setSelectedMap(true);
    }
    setChartsSelected((prevState) => (prevState.find((item) => item === chartName)
      ? prevState.filter((item) => item !== chartName)
      : [...prevState, chartName]));
  }

  useMemo(() => {
    if (local) {
      setDataTo(JSON.parse(local));
    }
  }, [local]);

  const emptyChartsSelected = useMemo(
    () => chartsSelected.length === 0,
    [chartsSelected],
  );

  const navChartsItems = useMemo(
    () => chartsNames.map((chartName) => {
      const chart = data[chartName.id];

      switch (chartName.id) {
        case 2:
          return {
            icon_active: '/assets/table_white.svg',
            icon: '/assets/table_blue.svg',
            ...chartName,
            loading: isLoading.table,
            disabled: isLoading.table || chart?.data.length === 0,
          };
        case 3:
          return {
            ...chartName,
            icon_active: '/assets/doughnut_chart_white.svg',
            icon: '/assets/doughnut_chart_blue.svg',
            loading: isLoading.ripening,
            disabled: isLoading.ripening || chart?.data.length === 0,
          };
        case 4:
          return {
            ...chartName,
            icon_active: '/assets/bar_chart_white.svg',
            icon: '/assets/bar_chart_blue.svg',
            loading: isLoading.diameter,
            disabled: isLoading.diameter || (chart?.data || [])
              .every((item) => item.data.datasets
                .every((i) => i.length === 0)),
          };
        case 5:
          return {
            ...chartName,
            icon_active: '/assets/bar_chart_white.svg',
            icon: '/assets/bar_chart_blue.svg',
            loading: isLoading.treeHeight,
            disabled: isLoading.treeHeight || (chart?.data || [])
              .every((item) => item.data.datasets
                .every((i) => i.length === 0)),
          };
        case 6:
          return {
            ...chartName,
            icon_active: '/assets/bar_chart_white.svg',
            icon: '/assets/bar_chart_blue.svg',
            loading: isLoading.onGround,
            disabled: isLoading.onGround || (chart?.data || [])
              .every((item) => item.data.datasets
                .every((i) => i.length === 0)),
          };
        case 8:
          return {
            ...chartName,
            icon_active: '/assets/bar_chart_white.svg',
            icon: '/assets/bar_chart_blue.svg',
            loading: isLoading.flower,
            disabled: isLoading.flower || (chart?.data || []).every((item) => item.data.datasets
              .every((i) => i.length === 0)),
          };
        case 9:
          return {
            ...chartName,
            icon_active: '/assets/doughnut_chart_white.svg',
            icon: '/assets/doughnut_chart_blue.svg',
            loading: isLoading.inventory,
            disabled: isLoading.inventory || (chart?.data || []).every((item) => item.data.datasets
              .every((i) => i.length === 0)),
          };
        case 10:
          return {
            ...chartName,
            icon_active: '/assets/bar_chart_white.svg',
            icon: '/assets/bar_chart_blue.svg',
            loading: isLoading.anomaly,
            disabled: isLoading.anomaly || (chart?.data || []).every((item) => item.data.datasets
              .every((i) => i.length === 0)),
          };
        default:
          // console.log(chart);
          return {
            ...chartName,
            icon_active: '/assets/bar_chart_white.svg',
            icon: '/assets/bar_chart_blue.svg',
            loading: false,
            disabled: isLoading || chart?.data.length === 0,
          };
      }
    }),
    [
      data,
      dataTo,
      id,
      local,
      report,
    ],
  );

  return (
    <section className={styles.container}>
      <aside>
        <nav className={styles.sidebar}>
          {navChartsItems.map((chartName) => (chartName.id === 1 ? (
            <div key={`div-${chartName.id}`}>
              <MapDropDown
                button={(
                  <ChartButton
                    type="button"
                    key={chartName.id}
                    onClick={() => {
                      handleChartSelect(chartName.name);
                    }}
                    selected={chartsSelected.includes(chartName.name)}
                    loading={(propArr.length < 9)}
                    disabled={(propArr.length < 9)}
                    iconActive="/assets/pin_map_white.svg"
                    icon="/assets/pin_map_blue.svg"
                  >
                    {chartName.name}
                  </ChartButton>
)}
              />
            </div>
          ) : (
            <div key={`div-${chartName.id}`}>
              <ChartButton
                type="button"
                key={chartName.id}
                valueKey={chartName.id}
                onClick={() => {
                  handleChartSelect(chartName.name);
                }}
                selected={chartsSelected.includes(chartName.name)}
                loading={chartName.loading}
                disabled={chartName.disabled}
                iconActive={chartName.icon_active}
                icon={chartName.icon}
              >
                {chartName.name}
              </ChartButton>
            </div>
          )))}
        </nav>
      </aside>

      <PdfCreator filterSelected={chartsSelected}>
        {emptyChartsSelected ? (
          <EmptyReportDetail loading={isLoading} />
        ) : (
          <section id="teste" className={styles.content}>
            {chartsSelected.includes('Mapa') && (
            <section
              style={{ gridColumn: 'span 3', width: '100%', height: '600px' }}
            >
              <MapDetail />
            </section>
            )}

            {chartsSelected.includes('Quantidade de Frutos') && (
              <div
  // id={chartsSelected.includes('Mapa') && 'page-break'}
                style={{
                  gridColumn: '1 / span 3',
                  textAlign: 'center',
                }}
              >
                <ChartDetail
                  key="block-amount-fruits"
                  chartName="Quantidade de Frutos"
                  blockName={`${data['2'].data
                    .map((item) => item.block)
                    .join(', ')}`}
                  variables={data['2'].data[0]?.variables || []}
                >
                  <div>
                    {/* !isLoading.table && data['2'].length !== 0 */}
                    {!isLoading.table && data['2'].length !== 0 ? (
                      <Box marginTop="20px" height="100%" width="100%">
                        <TableContainer component={Paper}>
                          <Table
                            className={styles.table}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Quadra</TableCell>
                                {[
                                  'Fruta Madura',
                                  'Fruta Verde',
                                  'Fruta Semi Madura',
                                  'Madura Anomalia',
                                  'Verde Anomalia',
                                ].map((item, ni) => (
                                  <TableCell
                                    key={`${item}-${ni + 1}`}
                                    align="center"
                                  >
                                    {item}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data['2'].data.map((item, n) => (
                                <TableRow key={`table-row-${item.block}-${n + 1}`}>
                                  <TableCell align="center">
                                    {item.block}
                                  </TableCell>
                                  {item.data.map((fruit, i) => (
                                    <TableCell key={`${fruit.name}-${i + 1}`} align="center">
                                      {new Intl.NumberFormat('pt-BR').format(fruit.total)}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    ) : (
                      <LinearProgress
                        style={{ fontSize: 50 }}
                        color="secondary"
                      />
                    )}
                  </div>
                </ChartDetail>
              </div>
            )}
            {/* <div
id={chartsSelected.includes('Quantidade de Frutos') && 'page-break'}
style={{
display: 'contents',
}}
> */}
            {chartsSelected.includes('Estágio de Maturação')
              && data['3'].data.map((block) => (
                <ChartDetail
                  key={`block-${block.block.name}`}
                  chartName="Estágio de Maturação"
                  blockName={block.block.name}
                  variables={block.variables || []}
                >
                  {/* {console.log(!isLoading.ripening, block.variables.reportId === id)} */}
                  {!isLoading.ripening && block?.variables.reportId === id ? (
                    <Doughnut
                      data={block.data}
                      plugins={[ChartDataLabels]}
                      options={{
                        plugins: {
                          responsive: true,
                          legend: {
                            labels: (value) => {
                              const w = (value.chart.width);
                              if (w > 200 && w < 236) {
                                return ({
                                  font: {
                                    size: 10,
                                  },
                                  usePointStyle: true,
                                  pointStyle: 'circle',
                                });
                              }
                              if (w <= 200) {
                                return ({
                                  font: {
                                    size: 8,
                                  },
                                  usePointStyle: true,
                                  pointStyle: 'circle',
                                });
                              }
                              return ({
                                usePointStyle: true,
                                pointStyle: 'circle',
                              });
                            },
                            // display: (value) => {
                            //   console.log(value.chart.width);
                            //   return true;
                            // },
                          },
                          tooltip: {
                            enabled: (value) => {
                              const w = value.chart.width;
                              if (w < 200) {
                                return true;
                              }
                              return false;
                            },
                          },
                          datalabels: {
                            backgroundColor: (context) => context.dataset.colors,
                            borderColor: (context) => {
                              const { dataIndex } = context;
                              const w = context.chart.width;
                              if (context.dataset.data[dataIndex] && w > 200) {
                                return '#c3c3c3';
                              }
                              return null;
                            },
                            color: (context) => {
                              const { dataIndex } = context;
                              const w = context.chart.width;
                              if (context.dataset.data[dataIndex] && w > 200) {
                                return '#000';
                              }
                              return null;
                            },
                            borderRadius: 25,
                            borderWidth: 2,
                            font: (value) => {
                              const w = value.chart.width;
                              if (w < 236) {
                                return {
                                  weight: 'bold',
                                  size: Math.round(w / 24),
                                };
                              }
                              return {
                                weight: 'bold',
                              };
                            },
                            padding: (value) => {
                              const w = value.chart.width;
                              if (w < 236) {
                                return 2;
                              }
                              return 6;
                            },
                            display: true,
                            align: (value) => {
                              const { dataIndex } = value;
                              const w = value.chart.width;
                              if (value.dataset.data[dataIndex] < 0 || w < 236) {
                                return 'center';
                              }
                              return 'start';
                            },
                            anchor: (value) => {
                              const { dataIndex } = value;
                              const w = value.chart.width;
                              if (value.dataset.data[dataIndex] < 0 || w < 236) {
                                return 'center';
                              }
                              return 'center';
                            },
                            offset: 8,
                            formatter: (value, context) => {
                              const w = context.chart.width;
                              if (value !== undefined && w > 200) {
                                return `${(value)}%`;
                              }
                              return null;
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </ChartDetail>
              ))}
            {/* </div> */}

            {/* <div
            id={chartsSelected.includes('Estágio de Maturação') && 'page-break'}
            style={{
            display: 'contents',
            }}
            > */}
            {chartsSelected.includes('Distribuição de Diâmetro')
              && data['4'].data.map((block) => (
                <ChartDetail
                  key={`block-${block.block.name}`}
                  chartName="Distribuição de Diâmetro"
                  blockName={block.block.name}
                  variables={block.variables || []}
                >
                  {/* {console.log(block.data)} */}
                  {!isLoading.diameter && block?.variables.reportId === id ? (
                    <Bar
                      data={block.data}
                      height="100%"
                      width="100%"
                      plugins={[ChartDataLabels]}
                      options={{
                        plugins: {
                          legend: {
                            labels: {
                              usePointStyle: true,
                              pointStyle: 'circle',
                            },
                            font: {
                              weight: 'bold',
                            },
                          },
                          datalabels: {
                            display: false,
                          },
                        },
                        scales: {
                          xAxes: {
                            title: {
                              color: '#161616',
                              display: true,
                              text: 'Diâmetro (mm)',
                            },
                          },
                          yAxes: {
                            title: {
                              color: '#161616',
                              display: true,
                              text: 'Ocorrência (%)',
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </ChartDetail>
              ))}
            {/* </div> */}
            {/* {console.log(data['5'].data)} */}
            {/* <div
            id={chartsSelected.includes('Distribuição de Diâmetro') && 'page-break'}
            > */}
            {chartsSelected.includes('Distribuição Altura das Árvores')
              && data['5'].data.map((block) => (
                <ChartDetail
                  key={`block-${block.block.name}`}
                  chartName="Distribuição Altura das Árvores"
                  blockName={block.block.name}
                  variables={block.variables || []}
                >
                  {/* {console.log(block.data)} */}
                  {!isLoading.treeHeight && block?.variables.reportId === id ? (
                    <Bar
                      data={block.data}
                      height="100%"
                      width="100%"
                      plugins={[ChartDataLabels]}
                      options={{
                        plugins: {
                          legend: {
                            labels: {
                              usePointStyle: true,
                              pointStyle: 'circle',
                            },
                          },
                          datalabels: {
                            display: false,
                          },
                        },
                        scales: {
                          xAxes: {
                            title: {
                              color: '#161616',
                              display: true,
                              text: 'Altura (m)',
                            },
                          },
                          yAxes: {
                            title: {
                              color: '#161616',
                              display: true,
                              text: 'Ocorrência (%)',
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </ChartDetail>
              ))}
            {/* </div> */}
            {chartsSelected.includes('Distribuição de frutos no chão')
              && data['6'].data.map((block) => (
                <ChartDetail
                  key={`block-${block.block.name}`}
                  chartName="Distribuição de frutos no chão"
                  blockName={block.block.name}
                  variables={block.variables || []}
                >
                  {!isLoading.onGround && block?.variables.reportId === id ? (
                    <Bar
                      data={block.data}
                      height="100%"
                      width="100%"
                      plugins={[ChartDataLabels]}
                      options={{
                        plugins: {
                          legend: {
                            labels: {
                              usePointStyle: true,
                              pointStyle: 'circle',
                            },
                            display: false,
                          },
                          datalabels: {
                            display: false,
                          },
                        },
                        scales: {
                          xAxes: {
                            title: {
                              color: '#161616',
                              display: true,
                              text: 'Porcentagem de frutos no chão (%)',
                            },
                          },
                          yAxes: {
                            title: {
                              color: '#161616',
                              display: true,
                              text: 'Ocorrências (%)',
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    <LinearProgress
                      style={{ fontSize: 50 }}
                      color="secondary"
                    />
                  )}
                </ChartDetail>
              ))}

            {chartsSelected.includes('Contagem de Árvores Ausentes')
              && data['7'].data.map((block) => (
                <ChartDetail
                  key={`block-${block.block.name}`}
                  chartName="Contagem de Árvores Ausentes"
                  blockName={block.block.name}
                  variables={block.variables || []}
                >
                  {/* {console.log(isLoading, block)} */}
                  <div>
                    {!isLoading && block?.variables.reportId === id ? (
                      <Bar
                        plugins={[ChartDataLabels]}
                        data={block.data}
                        height="100%"
                        width="100%"
                        options={{
                          plugins: {
                            legend: {
                              labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                              },
                            },
                            datalabels: {
                              display: false,
                            },
                          },
                        }}
                      />
                    ) : (
                      <LinearProgress
                        style={{ fontSize: 50 }}
                        color="secondary"
                      />
                    )}
                  </div>
                </ChartDetail>
              ))}

            {chartsSelected.includes('Anomalias na Florada')
              && data['8'].data.map((block) => (
                <ChartDetail
                  key={`block-${block.block}`}
                  chartName="Anomalias na Florada"
                  blockName={block.block}
                  variables={block.variables || []}
                >
                  {/* {console.log(isLoading, block)} */}
                  <div>
                    {!isLoading.flower && block ? (
                      <Bar
                        data={block.data}
                        height="100%"
                        width="100%"
                        plugins={[ChartDataLabels]}
                        options={{
                          plugins: {
                            legend: {
                              labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                              },
                            },
                            datalabels: {
                              display: false,
                            },
                          },
                          scales: {
                            xAxes: {
                              title: {
                                color: '#161616',
                                display: true,
                                text: 'Situação',
                              },
                            },
                            yAxes: {
                              title: {
                                color: '#161616',
                                display: true,
                                text: 'Quantidade',
                              },
                            },
                          },
                        }}
                      />
                    ) : (
                      <LinearProgress
                        style={{ fontSize: 50 }}
                        color="secondary"
                      />
                    )}
                  </div>
                </ChartDetail>
              ))}

            {chartsSelected.includes('Inventário de plantas')
              && data['9'].data.map((block) => (
                <ChartDetail
                  key={`block-${block.block.name}`}
                  chartName="Inventário de plantas"
                  blockName={block.block.name}
                  variables={block.variables || []}
                >
                  {/* {console.log(isLoading, block)} */}
                  <div>
                    {!isLoading.inventory && block?.variables.reportId === id ? (
                      <Doughnut
                        data={block.data}
                        plugins={[ChartDataLabels]}
                        options={{
                          plugins: {
                            legend: {
                              labels: (value) => {
                                const w = (value.chart.width);
                                if (w > 200 && w < 236) {
                                  return ({
                                    font: {
                                      size: 10,
                                    },
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                  });
                                }
                                if (w <= 200) {
                                  return ({
                                    font: {
                                      size: 8,
                                    },
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                  });
                                }
                                return ({
                                  usePointStyle: true,
                                  pointStyle: 'circle',
                                });
                              },
                            },
                            tooltip: {
                              enabled: (value) => {
                                const w = value.chart.width;
                                if (w < 200) {
                                  return true;
                                }
                                return false;
                              },
                            },
                            datalabels: {
                              backgroundColor: (context) => context.dataset.backgroundColor,
                              borderColor: (context) => {
                                const { dataIndex } = context;
                                const w = context.chart.width;
                                if (context.dataset.data[dataIndex] && w > 200) {
                                  return '#c3c3c3';
                                }
                                return null;
                              },
                              color: (context) => {
                                const { dataIndex } = context;
                                const w = context.chart.width;
                                if (context.dataset.data[dataIndex] && w > 200) {
                                  return '#000';
                                }
                                return null;
                              },
                              borderRadius: 25,
                              borderWidth: 2,
                              font: (value) => {
                                const w = value.chart.width;
                                if (w < 236) {
                                  return {
                                    weight: 'bold',
                                    size: Math.round(w / 24),
                                  };
                                }
                                return {
                                  weight: 'bold',
                                };
                              },
                              padding: (value) => {
                                const w = value.chart.width;
                                if (w < 236) {
                                  return 2;
                                }
                                return 6;
                              },
                              display: true,
                              align: (value) => {
                                const { dataIndex } = value;
                                const w = value.chart.width;
                                if (value.dataset.data[dataIndex] < 0 || w < 236) {
                                  return 'center';
                                }
                                return 'start';
                              },
                              anchor: (value) => {
                                const { dataIndex } = value;
                                const w = value.chart.width;
                                if (value.dataset.data[dataIndex] < 0 || w < 236) {
                                  return 'center';
                                }
                                return 'center';
                              },
                              offset: 8,
                              formatter: (value, context) => {
                                const w = context.chart.width;
                                if (value !== undefined && w > 200) {
                                  return `${(value)}%`;
                                }
                                return null;
                              },
                            },
                          },
                        }}
                      />
                    ) : (
                      <LinearProgress
                        style={{ fontSize: 50 }}
                        color="secondary"
                      />
                    )}
                  </div>
                </ChartDetail>
              ))}

            {chartsSelected.includes('Detecção de Anomalias')
              && data['10'].data.map((block) => (
                <ChartDetail
                  key={`block-${block.block}`}
                  chartName="Detecção de Anomalias"
                  blockName={block.block}
                  variables={block.variables || []}
                >
                  {/* {console.log(isLoading, block)} */}
                  <div>
                    {!isLoading.anomaly && block ? (
                      <Bar
                        data={block.data}
                        height="100%"
                        width="100%"
                        plugins={[ChartDataLabels]}
                        options={{
                          plugins: {
                            legend: {
                              labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                              },
                            },
                            datalabels: {
                              display: false,
                            },
                          },
                          scales: {
                          // xAxes: {
                          // title: {
                          // color: '#161616',
                          // display: true,
                          // text: 'Diâmetro',
                          // },
                          // },
                            yAxes: {
                              title: {
                                color: '#161616',
                                display: true,
                                text: 'Ocorrência (%)',
                              },
                            },
                          },
                        }}
                      />
                    ) : (
                      <LinearProgress
                        style={{ fontSize: 50 }}
                        color="secondary"
                      />
                    )}
                  </div>
                </ChartDetail>
              ))}
            {/* {console.log(data['11'].data)} */}
            {chartsSelected.includes('Cubicagem')
              && data['11'].data.map((block) => (
                <ChartDetail
                  key={`block-${block.block}`}
                  chartName="Cubicagem"
                  blockName={block.block}
                  variables={block.variables || []}
                >
                  <div>
                    {/* {console.log(isLoading, block)} */}
                    {!isLoading && block ? (
                      <Bar data={block.data} height="100%" width="100%" />
                    ) : (
                      <LinearProgress
                        style={{ fontSize: 50 }}
                        color="secondary"
                      />
                    )}
                  </div>
                </ChartDetail>
              ))}
          </section>
        )}
      </PdfCreator>
    </section>
  );
}

export { ReportDetail };

"use client";

interface ActionCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ActionCenter({ isOpen, onClose }: ActionCenterProps) {
  if (!isOpen) return null;

  const actions = [
    {
      category: "Priority Actions",
      items: [
        {
          title: "Stay Indoors",
          desc: "High UV index and heat. Peak hours 12 PM - 4 PM.",
          severity: "high",
        },
        {
          title: "Hydration Alert",
          desc: "Drink 3L of water today to combat heat stress.",
          severity: "medium",
        },
      ],
    },
    {
      category: "Community Actions",
      items: [
        {
          title: "Local Cleanup",
          desc: "Join the Yamuna bank cleanup drive this Saturday.",
          severity: "low",
        },
        {
          title: "Energy Saving",
          desc: "Grid load is high. Reduce AC usage by 2°C.",
          severity: "medium",
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm transition-colors" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-slate-800 shadow-2xl dark:shadow-slate-950/50 flex flex-col transition-colors">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Action Center</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Personalized for Delhi</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400 dark:text-slate-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {actions.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                  {group.category}
                </h3>
                <div className="space-y-4">
                  {group.items.map((action) => (
                    <div 
                      key={action.title}
                      className={`p-4 rounded-xl border-l-4 bg-white dark:bg-slate-700 shadow-sm border transition-colors ${
                        action.severity === 'high' ? 'border-l-red-500 dark:border-l-red-400 border-red-100 dark:border-red-900/30' :
                        action.severity === 'medium' ? 'border-l-amber-500 dark:border-l-amber-400 border-amber-100 dark:border-amber-900/30' :
                        'border-l-emerald-500 dark:border-l-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-white">{action.title}</h4>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded transition-colors ${
                          action.severity === 'high' ? 'bg-red-500 dark:bg-red-600 text-white' :
                          action.severity === 'medium' ? 'bg-amber-500 dark:bg-amber-600 text-white' :
                          'bg-emerald-500 dark:bg-emerald-600 text-white'
                        }`}>
                          {action.severity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{action.desc}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-lg bg-slate-900 dark:bg-blue-600 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors">
                          I Did This
                        </button>
                        <button className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </button>
                        <button className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest">Settings</h3>
              <div className="space-y-4">
                {[
                  { label: "Push Notifications", enabled: true },
                  { label: "Critical Alerts Only", enabled: false },
                  { label: "Weekly Summary", enabled: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{s.label}</span>
                    <button 
                      className={`w-10 h-5 rounded-full relative transition-colors ${
                        s.enabled ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-200 dark:bg-slate-600'
                      }`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                        s.enabled ? 'left-6' : 'left-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-600 transition-colors">
            <button className="w-full py-4 rounded-xl bg-blue-600 dark:bg-blue-500 text-white font-bold shadow-lg dark:shadow-blue-900/30 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all">
              Mark All as Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

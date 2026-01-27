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
          <div className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Actions</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">For Delhi, India</p>
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

          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
            {actions.map((group) => (
              <div key={group.category}>
                <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3 px-1">
                  {group.category}
                </h3>
                <div className="space-y-3">
                  {group.items.map((action) => (
                    <div 
                      key={action.title}
                      className={`p-4 rounded-2xl transition-all ${
                        action.severity === 'high' ? 'bg-red-50 dark:bg-red-950/40' :
                        action.severity === 'medium' ? 'bg-amber-50 dark:bg-amber-950/40' :
                        'bg-emerald-50 dark:bg-emerald-950/40'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-semibold ${
                          action.severity === 'high' ? 'text-red-900 dark:text-red-200' :
                          action.severity === 'medium' ? 'text-amber-900 dark:text-amber-200' :
                          'text-emerald-900 dark:text-emerald-200'
                        }`}>{action.title}</h4>
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                          action.severity === 'high' ? 'bg-red-500 text-white' :
                          action.severity === 'medium' ? 'bg-amber-500 text-white' :
                          'bg-emerald-500 text-white'
                        }`}>
                          {action.severity}
                        </span>
                      </div>
                      <p className={`text-sm mb-3 ${
                        action.severity === 'high' ? 'text-red-700 dark:text-red-300' :
                        action.severity === 'medium' ? 'text-amber-700 dark:text-amber-300' :
                        'text-emerald-700 dark:text-emerald-300'
                      }`}>{action.desc}</p>
                      <div className="flex gap-2">
                        <button className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                          action.severity === 'high' ? 'bg-red-500 hover:bg-red-600 text-white' :
                          action.severity === 'medium' ? 'bg-amber-500 hover:bg-amber-600 text-white' :
                          'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}>
                          I Did This
                        </button>
                        <button className={`px-3 py-2 rounded-lg transition-all ${
                          action.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50' :
                          action.severity === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50' :
                          'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </button>
                        <button className={`px-3 py-2 rounded-lg transition-all ${
                          action.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50' :
                          action.severity === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50' :
                          'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                        }`}>
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

            <div className="pt-6">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-widest px-1">Settings</h3>
              <div className="space-y-3">
                {[
                  { label: "Push Notifications", enabled: true },
                  { label: "Critical Alerts Only", enabled: false },
                  { label: "Weekly Summary", enabled: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700/50">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{s.label}</span>
                    <button 
                      className={`w-10 h-5 rounded-full relative transition-colors ${
                        s.enabled ? 'bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                        s.enabled ? 'left-5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30">
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold transition-all">
              Mark All Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

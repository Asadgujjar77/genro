import React, { useState } from 'react';
import { Calculator, ChevronRight, Loader } from 'lucide-react';
import { Button } from './ui/Button';
import { solveMathProblem } from '../utils/mathSolver';

export default function MathSolver() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = async () => {
    if (!problem.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await solveMathProblem(problem);
      setSolution(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to solve the problem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Math Problem Solver</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter your math problem
            </label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g., solve x^2 + 2x + 1 = 0 or integrate x^2 dx"
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 resize-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 dark:text-white"
              rows={3}
            />
          </div>

          <Button
            onClick={handleSolve}
            disabled={loading || !problem.trim()}
            className="w-full"
          >
            {loading ? (
              <Loader className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Solving...' : 'Solve Problem'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {solution && !error && (
        <div className="glass-card rounded-2xl p-6 prose dark:prose-invert max-w-none">
          <h3 className="text-lg font-semibold mb-4">Solution</h3>
          <div dangerouslySetInnerHTML={{ __html: solution }} />
        </div>
      )}
    </div>
  );
}
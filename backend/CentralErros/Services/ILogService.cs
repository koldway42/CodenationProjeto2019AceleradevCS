using CentralErros.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CentralErros.Services
{
    public interface ILogService
    {
        Log Save(Log log);

        Log Get(int id);

        List<Log> GetAll();

        List<Log> FindAllByUserId(int userId);

        IEnumerable<Log> OrderByLevel();

        IEnumerable<Log> FindByLevel(string level);

        IEnumerable<Log> FindByEnvironment(string environment);

        IEnumerable<Log> FindByDescricao(string descricao);

        IEnumerable<Log> FindByOrigem(string origem);

        Log Delete(Log log);

        Log Archive(Log log);
    }
}
